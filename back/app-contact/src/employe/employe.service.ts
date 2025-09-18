import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employe.dto';
import { UpdateEmployeeDto } from './dto/update-employe.dto';
import { CreateContactDto } from 'src/contacts/dto/create-contact.dto';
import { ContactsService } from 'src/contacts/contacts.service';
import { PasswordHashService } from 'src/password-hash/password-hash.service';

@Injectable()
export class EmployeService {
    constructor(private prisma: PrismaService, private contactService: ContactsService, private passwordHashService: PasswordHashService) { }

    async createEmployee(data: CreateEmployeeDto) {
        data.password = await this.passwordHashService.hashPassword(data.password);
        return this.prisma.employe.create({ data });
    }

    async updateEmployee(id: string, data: UpdateEmployeeDto) {
        return this.prisma.employe.update({
            where: { id },
            data,
        });
    }

    async deleteEmployee(id: string) {
        return this.prisma.employe.delete({ where: { id } });
    }

    async getEmployeeById(id: string) {
        return this.prisma.employe.findUnique({ where: { id } });
    }

    async getAllEmployees() {
        return this.prisma.employe.findMany();
    }

    async linkWithContact(employeId: string, contactId: CreateContactDto) {
        let contact = await this.prisma.contact.findUnique({ where: { email: contactId?.email } })

        if (!contact) {
            contact = await this.contactService.createContact(contactId);
        }
        let existing = await this.prisma.contactsEmployes.findUnique({
            where: {
                employeId_contactId: {
                    employeId: employeId,
                    contactId: contact.id
                }
            }
        });
        if (existing) {
            return existing;
        }
        return this.prisma.contactsEmployes.create({
            data: {
                contactId: contact.id,
                employeId: employeId
            }
        });
    }

    async unlinkFromContact(employeId: string, contactId: string) {
        return this.prisma.contactsEmployes.deleteMany({
            where: {
                employeId: employeId,
                contactId: contactId
            }
        });
    }
    async addNoteToContact(employeId: string, contactId: string, note: string, dateCreation: Date) {
        if (await this.prisma.contactsEmployes.findUnique({
            where: {
                employeId_contactId: {
                    employeId: employeId,
                    contactId: contactId
                }
            }
        })) {
            return this.prisma.contactsEmployes.update({
                where: {
                    employeId_contactId: {
                        employeId: employeId,
                        contactId: contactId
                    }
                },
                data: {
                    notes: note,
                    dateCreation: dateCreation,
                }
            });

        }
        else {
            return this.prisma.contactsEmployes.create({
                data: {
                    contactId: contactId,
                    employeId: employeId,
                    notes: note
                }
            });
        }
    }

    async getContactsForEmployee(employeId: string) {
        return this.prisma.contactsEmployes.findMany({
            where: { employeId },
            include: { contact: true }
        });
    }

    async getNotesForContact(employeId: string, contactId: string) {
        const record = await this.prisma.contactsEmployes.findUnique({
            where: {
                employeId_contactId: {
                    employeId,
                    contactId
                }
            }
        });
        return record ? record.notes : null;

    }

    async archiveContact(idContact: string, employeId: string) {
        return this.prisma.contactsEmployes.update({
            where: {
                employeId_contactId: {
                    employeId,
                    contactId: idContact
                }
            },
            data: { isArchived: true, dateArchivage: new Date() }
        });
    }
}

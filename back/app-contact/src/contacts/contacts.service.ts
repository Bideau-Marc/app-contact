import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { log } from 'console';

@Injectable()
export class ContactsService {
    constructor(private prisma: PrismaService) { }

    async getAllContacts() {
        return this.prisma.contact.findMany();
    }

    async getContactById(id: string) {
        return this.prisma.contact.findUnique({
            where: { id }
        });
    }

    async createContact(createContactDto: CreateContactDto) {
        console.log(createContactDto);

        return this.prisma.contact.create({
            data: {
                ...createContactDto,

            }
        });
    }

    async deleteContact(id: string) {
        return this.prisma.contact.delete({
            where: { id }
        });
    }

    async updateContact(id: string, updateContactDto: UpdateContactDto) {

        return this.prisma.contact.update({
            where: { id },
            data: {
                ...updateContactDto
            }
        });
    }

    async archiveContact(employeId: string, contactId: string) {
        return this.prisma.contactsEmployes.update({
            where: {
                employeId_contactId: {
                    employeId,
                    contactId
                }
            },
            data: {
                isArchived: true
            }
        });
    }

    async AddContactNote(employeId: string, contactId: string, note: string) {
        return this.prisma.contactsEmployes.update({
            where: {
                employeId_contactId: {
                    employeId,
                    contactId
                }
            },
            data: {
                notes: note
            }
        });
    }
}

import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { EmployeService } from './employe.service';
import { CreateEmployeeDto } from './dto/create-employe.dto';
import { UpdateEmployeeDto } from './dto/update-employe.dto';
import { CreateContactDto } from 'src/contacts/dto/create-contact.dto';

@Controller('employe')
export class EmployeController {
    constructor(private employeService: EmployeService) { }

    @Get()
    async getAllEmployees() {
        return this.employeService.getAllEmployees();
    }

    @Get(':id')
    async getEmployeeById(@Param('id') id: string) {
        console.log('Get employee by ID called with id:', this.employeService.getEmployeeById(id));
        return this.employeService.getEmployeeById(id);
    }

    @Post()
    async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
        return this.employeService.createEmployee(createEmployeeDto);
    }

    @Post('link/:employeId')
    async linkEmployee(@Param('employeId') employeId: string, @Body() createContactDto: CreateContactDto) {
        return this.employeService.linkWithContact(employeId, createContactDto);
    }

    @Delete('unlink/:employeId/:contactId')
    async unlinkEmployeContact(@Param('employeId') employeId: string, @Param('contactId') contactId: string) {
        return this.employeService.unlinkFromContact(employeId, contactId);
    }

    @Delete(':id')
    async deleteEmployee(@Param('id') id: string) {
        return this.employeService.deleteEmployee(id);
    }

    @Patch(':id')
    async updateEmployee(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
        return this.employeService.updateEmployee(id, updateEmployeeDto);
    }

    @Put(':employeId/note')
    async addNoteToContact(@Param('employeId') employeId: string, @Body() body: { contactId: string, note: string, dateCreation: Date }) {
        return this.employeService.addNoteToContact(employeId, body.contactId, body.note, body.dateCreation);
    }

    @Get(':employeId/contacts')
    async getContactsForEmployee(@Param('employeId') employeId: string) {
        return this.employeService.getContactsForEmployee(employeId);
    }

    @Get(':employeId/contacts/:contactId/notes')
    async getNotesForContact(@Param('employeId') employeId: string, @Param('contactId') contactId: string) {
        return this.employeService.getNotesForContact(employeId, contactId);
    }

    @Patch(':employeId/contacts/:contactId/archive')
    async archiveContact(@Param('employeId') employeId: string, @Param('contactId') contactId: string) {
        console.log('Archive contact called with employeId:', employeId, 'and contactId:', contactId);
        return this.employeService.archiveContact(contactId, employeId);
    }
}
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { get } from 'http';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contacts')
export class ContactsController {
    constructor(private readonly contactsService: ContactsService) { }

    @Get()
    async getAllContacts() {
        return this.contactsService.getAllContacts();
    }

    @Get(':id')
    async getContactById(@Param('id') id: string) {
        return this.contactsService.getContactById(id);
    }


    @Post()
    async createContact(@Body() createContactDto: CreateContactDto) {
        return this.contactsService.createContact(createContactDto);
    }

    @Patch(':id')
    async updateContact(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
        return this.contactsService.updateContact(id, updateContactDto);
    }

    @Delete(':id')
    async deleteContact(@Param('id') id: string) {
        return this.contactsService.deleteContact(id);
    }


}

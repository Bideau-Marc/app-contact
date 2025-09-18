import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmployeController } from './employe.controller';
import { EmployeService } from './employe.service';
import { ContactsService } from 'src/contacts/contacts.service';
import { ContactsModule } from 'src/contacts/contacts.module';
import { PasswordHashService } from 'src/password-hash/password-hash.service';

@Module({
    imports: [ContactsModule],
    controllers: [EmployeController],
    providers: [PrismaService, EmployeService, PasswordHashService],
    exports: [EmployeService],
})
export class EmployeModule { }

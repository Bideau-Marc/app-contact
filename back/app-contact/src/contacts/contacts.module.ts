import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { PrismaService } from 'src/prisma/prisma.service';

import { EmployeModule } from 'src/employe/employe.module';

@Module({
    controllers: [ContactsController],
    providers: [ContactsService, PrismaService],
    exports: [ContactsService],
})
export class ContactsModule { }

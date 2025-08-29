import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaService } from './prisma/prisma.service';
import { ContactsModule } from './contacts/contacts.module';
import { ContactsController } from './contacts/contacts.controller';
import { ContactsService } from './contacts/contacts.service';

@Module({
  imports: [ContactsModule],
  controllers: [AppController, ContactsController],
  providers: [AppService, ContactsService, PrismaService],
})
export class AppModule { }

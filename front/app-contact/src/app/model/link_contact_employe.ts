import { Contacts } from "./contact";

export class LinkContactEmployee {
    id!: string;
    contactId!: string;
    employeeId!: string;
    linkDate?: Date;
    notes?: string;
    isArchived?: boolean;
    dateArchivage?: Date;
    dateCreation?: Date;
    contact!: Contacts;
}
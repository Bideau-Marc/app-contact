import { Contacts } from "./contact";

export interface Employee {
    id?: string;
    name?: string;
    email: string;
    password: string;
    creationDate?: Date;
    contacts?: Contacts[]
}
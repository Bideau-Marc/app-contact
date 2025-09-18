import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Employee } from '../model/employe';
import { Employe } from '../service/employe/employe';
import { Router } from '@angular/router';
import { Auth } from '../service/auth/auth';
import { FormsModule } from '@angular/forms';
import { LinkContactEmployee } from '../model/link_contact_employe';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Contact } from '../service/contact/contact';
import { Contacts } from '../model/contact';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [CommonModule, FormsModule]
})
export class Home implements OnInit {
  // linkContactEmploye: LinkContactEmployee[] = [];
  employe: Employee = {
    id: '',
    name: '',
    email: '',
    password: '',
    creationDate: new Date(),
    contacts: []
  };
  editingContactId: string | null = null;

  linkContactEmploye$ = new BehaviorSubject<LinkContactEmployee[]>([]);
  constructor(
    private employeService: Employe,
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: Auth,
    private router: Router,
    private contactService: Contact
  ) { }

  ngOnInit(): void {
    const employeId = sessionStorage.getItem('idUser') || '';
    console.log(employeId, "employe", employeId);
    this.employe.id = employeId;
    this.getContacts();
  }

  logout() {
    this.authService.logout();
  }

  createContact() {
    this.router.navigateByUrl('createContact')
  }

  editContact(arg0: any) { throw new Error('Method not implemented.'); }
  archiveContact(id: string | undefined) {
    console.log(this.employe, id);

    if (this.employe.id && id) {
      this.employeService.archiveContactToEmploye(this.employe.id, id).subscribe({
        next: (data) => {
          console.log("succesfull", data);

          this.getContacts()

        }
      })
    }
    else {
      this.router.navigate(['Login'])
    }

  }
  getContacts() {//
    if (this.employe.id)
      this.employeService.getContactsByEmployeId(this.employe.id).subscribe({
        next: (data) => {
          console.log(data, "data");
          this.linkContactEmploye$.next(data);
        }
      })
    console.log();

  }
  // ✅ Getters pour optimiser les filtres
  get activeContacts$(): Observable<LinkContactEmployee[]> {
    return this.linkContactEmploye$.pipe(
      map(contacts => contacts.filter(c => !c.isArchived))
    );
  }

  get archivedContacts$(): Observable<LinkContactEmployee[]> {
    return this.linkContactEmploye$.pipe(
      map(contacts => contacts.filter(c => c.isArchived))
    );
  }

  startEdit(contactId: string) {
    this.editingContactId = contactId;

  }

  saveEdit(contact: Contacts) {
    // Appel API pour sauvegarder

    this.contactService.updateContact(contact).subscribe({
      next: () => {
        this.editingContactId = null;
        this.getContacts(); // Refresh
      }
    });



  }

  cancelEdit() {
    this.editingContactId = null;
  }
  saveEditLinkContact(linkContact: LinkContactEmployee) {
    if (this.employe.id && linkContact.dateCreation && linkContact.notes && linkContact.contact.id)
      this.employeService.updateNoteOrDateFromContact(this.employe.id, linkContact.dateCreation, linkContact.contact.id, linkContact.notes).subscribe({
        next: () => {
          this.editingContactId = null;
          this.getContacts();
        }
      })
  }
}

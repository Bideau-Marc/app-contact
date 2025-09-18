import { Component } from '@angular/core';
import { Contacts } from '../model/contact';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employe } from '../service/employe/employe';
import { Contact as ContactService } from '../service/contact/contact';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  contact: Contacts = {
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 'actif' // Valeur par défaut utile
  };
  employeId: string = ''
  constructor(private employeService: Employe, private contactService: ContactService, private router: Router) {
    this.employeId = sessionStorage.getItem('idUser') || '';


  }


  onSubmit() {
    console.log("contact", this.contact);

    this.contactService.createContact(this.contact).subscribe({
      next: (data: Contacts) => {
        console.log("contact créé : ", data);
        if (data.id) {
          this.employeService.linkContactToEmploye(this.employeId, this.contact).subscribe({
            next: (data) => {
              console.log(data, "link created");
              this.router.navigateByUrl('/home')
            },
            error: (linkError) => {
              console.error("Erreur création lien", linkError);
              // Optionnel: rollback → supprimer le contact créé
            }
          })
        }
        else {
          throw new Error('Erreur lors de la création du contact')
        }
      },
      error: (err: any) => {
        console.error(err, "error lors de la création du contact")
      }
    })
  }

  undo() {
    this.router.navigateByUrl('')
  }
}

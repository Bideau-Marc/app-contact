import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Contacts } from '../../model/contact';

@Injectable({
  providedIn: 'root'
})
export class Contact {
  private apiurl = environment.API_URL + "/contacts";
  constructor(private http: HttpClient) { }

  createContact(contact: Contacts) {
    console.log(this.apiurl);

    return this.http.post(this.apiurl, contact)
  }

  updateContact(contact: Contacts) {
    return this.http.patch(this.apiurl + `/${contact.id}`, contact)
  }

}

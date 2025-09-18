import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../../model/employe';
import { Observable } from 'rxjs';
import { Contacts } from '../../model/contact';
import { LinkContactEmployee } from '../../model/link_contact_employe';
@Injectable({
  providedIn: 'root'
})
export class Employe {
  private apiurl = environment.API_URL;
  constructor(private http: HttpClient) { }

  getAllEmploye(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiurl + '/employe', {

    });
  }

  getEmployeById(id: string): Observable<Employee> {
    console.log("getting employe by id", id);

    return this.http.get<Employee>(this.apiurl + '/employe/' + id, {

    });
  }
  createEmploye(employe: Employe) {
    return this.http.post(this.apiurl + '/employe', employe, {

    });
  }

  getContactsByEmployeId(id: string): Observable<LinkContactEmployee[]> {
    return this.http.get<LinkContactEmployee[]>(this.apiurl + '/employe/' + id + '/contacts', {
    });
  }

  linkContactToEmploye(employeId: string, contact: Contacts) {
    console.log(this.apiurl + '/employe/' + employeId + '/contacts/' + contact);

    return this.http.post(this.apiurl + '/employe/link/' + employeId, contact);
  }
  unlinkContactToEmploye(employeId: string, contactId: string) {
    return this.http.delete(this.apiurl + '/employe/' + employeId + '/contacts/' + contactId, {

    });
  }

  getNotesByEmployeId(id: string) {
    return this.http.get(this.apiurl + '/employe/' + id + '/notes', {

    });
  }

  archiveContactToEmploye(employeId: string, contactId: string) {
    return this.http.patch(this.apiurl + '/employe/' + employeId + '/contacts/' + contactId + '/archive', {}, {

    });
  }
  updateNoteOrDateFromContact(employeid: string, dateCreation: Date, contactId: string, note: string) {
    console.log('note');

    return this.http.put(this.apiurl + `/employe/${employeid}/note`, { contactId: contactId, note: note, dateCreation: dateCreation })
  }
  //{ contactId: string, note: string, dateCreation: Date }

  getuserID() {
    sessionStorage.getItem('idUser') || '{}';
  }
}
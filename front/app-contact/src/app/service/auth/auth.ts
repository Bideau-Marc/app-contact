import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../../model/employe';
import { environment } from '../../../environments/environment.development';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { ApiError } from '../../model/api-error';
@Injectable({
  providedIn: 'root'
})
export class Auth {

  apiurl = environment.API_URL;
  constructor(private http: HttpClient) { }

  login(employe: Employee): Observable<{ id: string }> {
    console.log(employe);

    this.http.post<string>(this.apiurl + '/auth/login', employe, { observe: 'response' }).pipe(
      map(response => response.body), // On extrait le body
      catchError((error: HttpErrorResponse) => {
        const apiError: ApiError = {
          statusCode: error.status,
          message: error.error.message,
          error: error.error.error
        };

        return throwError(() => apiError);
      })
    );
    this.http.post<{ id: string }>(
      this.apiurl + '/auth/login',
      employe
    ).subscribe(data => {
      console.log("here data ", data.id);
    })
    return this.http.post<{ id: string }>(
      this.apiurl + '/auth/login',
      employe
    )
  }





  logout(): void {

  }


}
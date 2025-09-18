import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export const authGuard: CanActivateFn = () => {
  const apiurl = environment.API_URL
  const http = inject(HttpClient);
  const router = inject(Router);


  return http.get(apiurl + '/auth/me', { withCredentials: true, responseType: 'text' }).pipe(
    map(() => true), // si ça marche → accès autorisé
    catchError(() => {
      console.log("error here");

      router.navigate(['/login']);
      return of(false);
    })
  );
};

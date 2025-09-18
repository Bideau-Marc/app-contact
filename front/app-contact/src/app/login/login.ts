import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../service/auth/auth';
import { Employe } from '../service/employe/employe';
import { Router } from '@angular/router';
import { ApiError } from '../model/api-error';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  errorType: string = '';
  constructor(private authService: Auth, private router: Router) { }
  employe: Employee = {
    email: '',
    password: ''
  };

  login() {
    console.log('🔐 Login attempt:', this.employe, "jere");
    //test 2
    this.authService.login(this.employe).subscribe({
      next: (data) => {
        console.log('✅ Login successful:', data.id);
        console.log('📦 Storing idUser:', data.id);

        sessionStorage.setItem('idUser', data.id);

        console.log('🔄 Navigating to /home');
        this.router.navigateByUrl('/home').then(success => {
          console.log('🎯 Navigation success:', success);
        }).catch(error => {
          console.error('💥 Navigation error:', error);
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error('❌ Login error:', error, error.error.message);

        // Gestion des différents types d'erreurs
        if (error.error.message) {
          // C'est une ApiError
          switch (error.error.statusCode) {
            case 404:
              console.log("error user");
              this.errorType = 'User not found'
              this.hasError('User not found');

              break;
            case 401: //test"""""""ee
              this.errorType = 'Invalid password'

              this.hasError('Invalid password');
              break;
            case 400:
              this.errorType = 'Bad email';
              this.hasError('Bad email');
              break;
            case 0:
              this.hasError('Serveur indisponible');
              break;
            default:
              this.hasError(error.message || 'Erreur inconnue');
          }
        } else {
          // C'est une Error standard
          // this.hasError(error);
        }
      },
      complete: () => {
        console.log('🏁 Login observable completed');
      }
    });
  }
  // Méthode pour afficher les erreurs à l'utilisateur
  // Méthode pour vérifier le type d'erreur
  hasError(type: string): boolean {
    return this.errorType === type;
  }

}
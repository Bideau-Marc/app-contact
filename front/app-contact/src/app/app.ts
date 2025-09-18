import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'app-contact';
  constructor(private router: Router) {

  }
  isLoginPage() {
    console.log('login', this.router.url);

    return this.router.url === '/login'

  }
  logout() {
    this.router.navigateByUrl('/login')
  }
}

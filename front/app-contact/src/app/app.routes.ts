import { Routes } from '@angular/router';
import { authGuard } from './service/auth/auth-guard';
import { Login } from './login/login';
import { Home } from './home/home';
import { Contact } from './contact/contact';
export const routes: Routes = [
    {
        path: '', // <-- existe 
        component: Home,
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: Login,
    },
    {
        path: 'createContact',
        component: Contact,
        canActivate: [authGuard]
    },
    { path: '**', redirectTo: '' }

];

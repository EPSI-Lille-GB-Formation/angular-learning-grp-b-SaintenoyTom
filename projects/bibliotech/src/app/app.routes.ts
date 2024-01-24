import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'main-page', component: MainPageComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' } // Gestion des routes inconnues
];
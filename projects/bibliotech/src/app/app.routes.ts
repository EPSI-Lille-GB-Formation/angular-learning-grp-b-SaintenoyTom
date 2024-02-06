import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AdministrationComponent } from './administration/administration.component';
import { BookComponent } from './book/book.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'main-page', component: MainPageComponent},
    { path: 'user-page/:id', component: UserPageComponent },
    { path: 'book/:id', component: BookComponent },
    { path: 'administration', component: AdministrationComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' } // Gestion des routes inconnues
];
import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AdministrationComponent } from './administration/administration.component';
import { BookComponent } from './book/book.component';
import { RegisterComponent } from './register/register.component';
import { ModifyBookComponent } from './modify-book/modify-book.component';
import { AddbookComponent } from './addbook/addbook.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'main-page', component: MainPageComponent},
    { path: 'user-page/:id', component: UserPageComponent },
    { path: 'book/add', component: AddbookComponent},
    { path: 'book/:id', component: BookComponent },
    { path: 'administration', component: AdministrationComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'book/:id/modify', component: ModifyBookComponent},
    { path: '', redirectTo: '/main-page', pathMatch: 'full' },
    { path: '**', redirectTo: '/main-page' } // Gestion des routes inconnues
];
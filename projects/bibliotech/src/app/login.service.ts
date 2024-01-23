// auth.service.ts
import { Injectable } from '@angular/core';
import { USERS } from './mock-users';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    private isLogged: boolean = !!localStorage.getItem('isLogged');

    constructor(){
        localStorage.removeItem('isLogged');
    }

    authenticate(email: string, password: string): boolean {
        const user = USERS.find(u => u.email === email && u.password === password);
        this.isLogged = !!user;
        localStorage.setItem('isLogged', this.isLogged ? 'true' : 'false');
        return this.isLogged;
    }

    getIsLogged(): boolean{
        return this.isLogged;
    }

    logout(): void {
        console.log('Avant déconnexion - isAuthenticated:', this.isLogged, localStorage.getItem('isLogged'));
        this.isLogged = false;
        localStorage.setItem('isLogged', 'false');
        console.log('Après déconnexion - isAuthenticated:', this.isLogged,localStorage.getItem('isLogged')) ;
      }

}
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    private isLogged: boolean = !!localStorage.getItem('isLogged');

    constructor(private userService: UserService, private router: Router){
    }

    async authenticate(email: string, password: string): Promise<boolean> {
        try{
            const users = await this.userService.getUsers().toPromise();
            if (!users) {
                console.error('La liste des utilisateurs est indéfinie.');
                return false;
              }

            const isUserAuthenticated = users.some(u => u.email === email && u.password === password);

            this.isLogged = isUserAuthenticated;;
            localStorage.setItem('isLogged', this.isLogged ? 'true' : 'false');
            
            return this.isLogged;

            }catch (error){
                console.error('Erreur lors de l\'authentification :', error)
                throw error;
            }
    }

    getIsLogged(): boolean{
        return this.isLogged;
    }

    logout(): void {
        this.isLogged = false;
        localStorage.removeItem('isLogged');
      }

}
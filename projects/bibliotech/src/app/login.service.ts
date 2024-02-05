import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { Users } from './users';

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

            const currentUser = users.find(u => u.email === email && u.password === password);
            if (currentUser !== undefined) {
              const currentUserForStock = {
                id: currentUser.id,
                firstname: currentUser.firstname,
                lastname: currentUser.lastname,
                email: currentUser.email,
                role: currentUser.role
              };
              localStorage.setItem('user_logged', JSON.stringify(currentUserForStock));
              this.isLogged = true;
              localStorage.setItem('isLogged', this.isLogged ? 'true' : 'false');
            }else{
              this.isLogged = false;
              localStorage.setItem('isLogged', this.isLogged ? 'true' : 'false');
            }
            
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
        localStorage.removeItem('user_logged');
      }

}
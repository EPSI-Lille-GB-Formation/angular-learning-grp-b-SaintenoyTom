import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../users';
import { LoginService } from '../login.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div *ngIf="isLogged;" class='header'>
  <button (click)="return()">Retour</button>
  </div>
  <div *ngFor="let user of users" style="display: flex; align-items: center;">
  <p style="margin-right: 20px; margin-left: 10px;">{{ user.firstname }} {{ user.lastname }}</p>
  <p style="margin-right: 20px; margin-left: 10px;">Rôle : {{user.role}}</p>
  <button (click)="deleteUser(user.id)" style ="width: 200px; margin-right: 20px;">Supprimer</button>
  <button (click)="editUser(user.id)" style ="width: 200px;">Editer</button>
  </div>
  `,
  styleUrl: './administration.component.css',
  providers: [LoginService, UserService]
})
export class AdministrationComponent {
  currentUser: Users | null = null;
  users: Users[] = [];

  constructor(private router: Router, private loginService: LoginService, private userService: UserService){}

  ngOnInit(){
    if(!this.isLogged){
      this.router.navigate(['/main-page']);
    }else{
      this.loadUsers();
      this.currentUser = this.userService.getCurrentUserFromLocalStorage();
    }
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    this.return();
  }

  return(): void{
    localStorage.setItem('user_logged', JSON.stringify(this.currentUser));
    this.router.navigate(['/main-page']);
  }

  get isLogged(): boolean{
    return this.loginService.getIsLogged();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(() => {
      this.loadUsers(); 
      if(userId == this.currentUser?.id){
        this.loginService.logout();
        this.router.navigate(['/main-page']);
      }
      
    });
  }

  editUser(userId: number): void{
    localStorage.setItem('user_logged', JSON.stringify(this.currentUser));
    this.router.navigate(['/user-page', userId]);
  }
}

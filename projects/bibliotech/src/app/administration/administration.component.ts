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
  `,
  styleUrl: './administration.component.css',
  providers: [LoginService, UserService]
})
export class AdministrationComponent {
  currentUser: Users | null = null;

  constructor(private router: Router, private loginService: LoginService, private userService: UserService){}

  ngOnInit(){
    if(!this.isLogged){
      this.router.navigate(['/main-page']);
    }else{
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
}

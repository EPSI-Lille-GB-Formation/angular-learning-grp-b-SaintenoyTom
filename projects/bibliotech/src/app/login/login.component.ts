import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class = "container">
  <label for="username">Nom d'utilisateur:</label>
  <input type="text" id="username" [(ngModel)]="email" (keyup.enter)="login()" />

  <label for="password">Mot de passe:</label>
  <input type="password" id="password" [(ngModel)]="password" (keyup.enter)="login()" />

  <button (click)="login()">Se connecter</button>
  <div *ngIf="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private loginService: LoginService){}

  login(){
    if (this.loginService.authenticate(this.email, this.password)){
      this.router.navigate(['/main-page']);
    }else{
      this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
    }
  }

  get IsLogged(): boolean {
    return this.loginService.getIsLogged();
  }

}

import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

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
  <div *ngIf="IsLogged" class="container">
  <button (click)="redirectToMainPage()">Accéder à l'application</button>
</div>
  `,
  styleUrl: './login.component.css',
  providers: [LoginService, UserService]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private loginService: LoginService, private userService: UserService){}

  ngOnInit(): void {
    if (this.loginService.getIsLogged()) {
      this.router.navigate(['/main-page']);
    }
  }

  async login(){
    const isAuthenticated = await this.loginService.authenticate(this.email, this.password);
    if (isAuthenticated){
      this.router.navigate(['/main-page']);
    }else{
      this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
    }
  }

  get IsLogged(): boolean {
    return this.loginService.getIsLogged();
  }

  redirectToMainPage() {
    this.router.navigate(['/main-page']);
  }

}

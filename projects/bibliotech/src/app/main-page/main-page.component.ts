import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div>
  <h1>Bienvenue sur la page principale</h1>

  <div *ngIf="isLogged;">
    <!-- Contenu affiché lorsque l'utilisateur est connecté -->
    <p>Vous êtes connecté. Bienvenue!</p>
    <!-- Ajoute d'autres éléments pour un utilisateur connecté -->
    <button (click)="logout()">Se déconnecter</button>
  </div>
</div>
  `,
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService){}

  ngOnInit(): void {
    if (!this.loginService.getIsLogged()) {
      // L'utilisateur n'est pas connecté, redirige vers la page de connexion
      this.router.navigate(['/login']);
    }
  }

  get isLogged(): boolean{
    return this.loginService.getIsLogged();
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}

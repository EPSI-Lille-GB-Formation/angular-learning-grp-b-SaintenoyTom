import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../book';

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
  styleUrl: './main-page.component.css',
  providers: [BookService, LoginService]
})
export class MainPageComponent {
  books: Book[] = [];

  constructor(private router: Router, private loginService: LoginService, private bookService: BookService){}

  ngOnInit(): void {
    if (!this.loginService.getIsLogged()) {
      // L'utilisateur n'est pas connecté, redirige vers la page de connexion
      this.router.navigate(['/login']);
    }else{
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

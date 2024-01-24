import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../book';
import { error } from 'console';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div>
  <h1>Bienvenue sur la page principale</h1>

  <div *ngIf="isLogged;">
    <p>Vous êtes connecté. Bienvenue!</p>
    <button (click)="logout()">Se déconnecter</button>
    <div *ngIf="booksList.length > 0">
    <h3>Liste des livres :</h3>
    <ul>
      <li *ngFor="let book of booksList">{{ book.title }}</li>
    </ul>
  </div>
  <div *ngIf="booksList.length === 0">
    <p>Aucun livre disponible.</p>
  </div>
  </div>
</div>

  `,
  styleUrl: './main-page.component.css',
  providers: [BookService, LoginService]
})
export class MainPageComponent {
  booksList: Book[] = [];

  constructor(private router: Router, private loginService: LoginService, private bookService: BookService){}

  ngOnInit(): void {
    if (!this.loginService.getIsLogged()) {
      this.router.navigate(['/login']);
    }else{
      this.bookService.getBooks().subscribe(
        books => {
          this.booksList = books;
        },
        error => {
          console.error('Erreur lors de la récupération des livres :', error);
        }
      );
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

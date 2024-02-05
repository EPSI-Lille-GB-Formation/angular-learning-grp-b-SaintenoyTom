import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../book';
import { Users } from '../users';
import { UserService } from '../user.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div *ngIf="isLogged;" class='header'>
  <p>{{currentUser?.firstname}} {{currentUser?.lastname}}</p>
  <button (click)="logout()">Se déconnecter</button>
  </div>
  <div *ngIf="!isLogged;" class='header'>
  <button (click)="login()">Se connecter</button>
  </div>
    <div *ngIf="booksList.length > 0" class = 'container'>
    <h1>Biblio'tech</h1>
    <h3>Liste des livres :</h3>
    <ul>
      <li *ngFor="let book of booksList">{{ book.title }}</li>
    </ul>
  </div>
  <div *ngIf="booksList.length === 0">
    <p>Aucun livre disponible.</p>
  </div>


  `,
  styleUrl: './main-page.component.css',
  providers: [LoginService, BookService, UserService]
})
export class MainPageComponent {
  booksList: Book[] = [];
  currentUser: Users | null = null;

  constructor(private router: Router, private loginService: LoginService, private bookService: BookService, private userService: UserService){
  }

  async ngOnInit() {
    this.currentUser = this.userService.getCurrentUserFromLocalStorage();
      this.bookService.getBooks().subscribe(
        books => {
          this.booksList = books;
        },
        error => {
          console.error('Erreur lors de la récupération des livres :', error);
        }
      );
  }

  get isLogged(): boolean{
    return this.loginService.getIsLogged();
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  login(): void {
    this.router.navigate(['/login']);
  }
}

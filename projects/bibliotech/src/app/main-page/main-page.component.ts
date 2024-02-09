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
  <a (click)="userPage()" >{{currentUser?.firstname}} {{currentUser?.lastname}}</a>
  <button (click)="logout()">Se déconnecter</button>
  </div>
  <div *ngIf="!isLogged;" class='header'>
  <button (click)="login()">Se connecter</button>
  <button (click)="register()">S'inscrire</button>
  </div>
    <div *ngIf="booksList.length > 0" class = 'container'>
    <h1>Biblio'tech</h1>
    <h3>Liste des livres :</h3>
    <ul>
      <li *ngFor="let book of booksList">
      <h4>{{ book.title }}</h4>
      <img *ngIf="book.image" [src]="book.image.startsWith('http') ? book.image : '../assets/' + book.image" alt="{{ book.title }} Image" class="max-image-size">
      <p *ngIf="book.resume">{{ book.resume }}</p>
        <div class = "action-buttons">
          <button class="action-button" *ngIf="isLogged && ((currentUser && book.auteurId === currentUser.id) || (currentUser && currentUser.role === 'admin'))">Modifier</button>
          <button (click)="deleteBook(book.id)" class="action-button" *ngIf="isLogged && ((currentUser && book.auteurId === currentUser.id) || (currentUser && currentUser.role === 'admin'))">Supprimer</button>
        </div>
        <div class = "action-buttons2">
          <button (click)="bookDetails(book.id)" class="action-button2" *ngIf="isLogged">Consulter</button>
        </div>
    </li>
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
    if(!this.currentUser){
      this.logout();
    }
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
  }

  login(): void{
    this.router.navigate(['/login']);
  }

  userPage(): void {
    if(this.currentUser?.role === "user"){
      this.router.navigate(['/user-page', this.currentUser?.id]);
      localStorage.setItem('user_logged', JSON.stringify(this.currentUser));
    }else{
      this.router.navigate(['/administration']);
      localStorage.setItem('user_logged', JSON.stringify(this.currentUser));
    }
  }

  bookDetails(bookId: number): void {
    localStorage.setItem('user_logged', JSON.stringify(this.currentUser));
    this.router.navigate(['/book', bookId])
  }

  deleteBook(bookId: number): void {
    this.bookService.deleteBook(bookId).subscribe(() => {
      this.loadBooks(); 
    });
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe(books => {
      this.booksList = books;
    });
  }

  register(): void{
    this.router.navigate(['/register']);
  }

}

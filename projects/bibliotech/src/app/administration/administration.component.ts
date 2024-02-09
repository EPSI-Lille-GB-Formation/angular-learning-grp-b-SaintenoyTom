import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../users';
import { LoginService } from '../login.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { Categories } from '../categories';
import { CategoriesService } from '../categories.service';
import { FormsModule } from '@angular/forms';
import { BookService } from '../book.service';
import { Book } from '../book';

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div *ngIf="isLogged;" class='header'>
  <button (click)="return()">Retour</button>
  </div>
  <h2>Liste des utilisateurs:</h2>
  <div *ngFor="let user of users" style="display: flex; align-items: center;">
    <p style="margin-right: 20px; margin-left: 10px;">{{ user.firstname }} {{ user.lastname }}</p>
    <p style="margin-right: 20px; margin-left: 10px;">Rôle : {{user.role}}</p>
    <button (click)="deleteUser(user.id)" style ="width: 200px; margin-right: 20px;">Supprimer</button>
    <button (click)="editUser(user.id)" style ="width: 200px;">Editer</button>
  </div>
  <h2>Liste des catégories:</h2>
  <div style="margin-top: 20px;">
    <input type="text" [(ngModel)]="newCategory" placeholder="Nouvelle catégorie">
    <button [disabled]="!newCategory" (click)="addCategory()">Ajouter</button>
  </div>
  <div *ngFor="let categorie of categories" style="display: flex; align-items: center;">
    <p style="margin-right: 20px; margin-left: 10px;">{{ categorie.label }}</p>
    <button (click)="deleteCategory(categorie.id)" style ="width: 200px; margin-right: 20px;">Supprimer</button>
    <button style ="width: 200px;">Editer</button>
  </div>
  `,
  styleUrl: './administration.component.css',
  providers: [LoginService, UserService]
})
export class AdministrationComponent {
  currentUser: Users | null = null;
  books: Book[] = [];
  users: Users[] = [];
  categories: Categories[] = [];
  newCategory: string = '';

  constructor(private router: Router, private loginService: LoginService, private userService: UserService, private categoriesService: CategoriesService, private bookService: BookService){}

  ngOnInit(){
    if(!this.isLogged){
      this.router.navigate(['/main-page']);
    }else{
      this.loadUsers();
      this.loadCategories();
      this.loadBooks();
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

  loadBooks(): void{
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
    })
  }

  loadCategories(): void {
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(() => {
      this.loadUsers(); 
      for (let i = 0; i < this.books.length; i++) {
        const book = this.books[i];
        if (book.auteurId === userId) {
            this.bookService.deleteBook(book.id).subscribe(() => {
            });
        }
    }
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

  addCategory(): void {
    if (this.newCategory.trim() !== '') { 
      const newCategoryId = this.generateCategoryId();
      const newCategory = {
        id: newCategoryId,
        label: this.newCategory.trim() // Assurez-vous de supprimer les espaces vides au début et à la fin
      };
      this.categoriesService.addCategory(newCategory).subscribe(
        () => {
          this.categories.push(newCategory);
          this.newCategory = '';
        }
      );
    }
  }

  private generateCategoryId(): number {
    let maxId = 0;
    this.categories.forEach(category => {
      if (category.id > maxId) {
        maxId = category.id;
      }
    });
  return maxId + 1;
  }

  deleteCategory(categoryId: number): void {
    this.categoriesService.deleteCategory(categoryId).subscribe(() => {
      this.loadCategories();
      for (let i = 0; i < this.books.length; i++) {
        const book = this.books[i];
        if (book.categorieId.includes(categoryId)) {
            const index = book.categorieId.indexOf(categoryId);
            book.categorieId.splice(index, 1); // Supprimer l'index contenant l'ID de la catégorie
            this.bookService.updateBook(book).subscribe(() =>{
            });
        }
    }
    });
  }
  
}

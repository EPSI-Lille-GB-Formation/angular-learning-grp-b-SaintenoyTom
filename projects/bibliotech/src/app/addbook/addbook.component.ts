import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { CategoriesService } from '../categories.service';
import { Categories } from '../categories';
import { Book } from '../book';
import { Users } from '../users';
import { UserService } from '../user.service';
import { Page } from '../page';
import { PageService } from '../page.service';

@Component({
  selector: 'app-addbook',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
  <form [formGroup]="bookForm" (ngSubmit)="onSubmit()">
  <label for="title">Titre :</label>
  <input type="text" id="title" formControlName="title">
  <label for="image">Lien vers l'image: </label>
  <input type="text" id="image" formControlName="image">
  <label for="resume">Résumé: </label>
  <input type="text" id="resume" formControlName="resume">
  <label for="categories">Catégories:</label>
    <select id="categories" name="categories"  formControlName="categories" multiple>
      <option *ngFor="let category of categoriesList" [value]="category.id">{{ category.label }}</option>
    </select>
  <button type="submit" [disabled]="bookForm.invalid">Ajouter</button>
  <button type="button" (click)="Cancel()">Annuler</button>
  </form>
  `,
  styleUrl: './addbook.component.css'
})
export class AddbookComponent {
  currentUser: Users | null = null;
  bookForm: FormGroup;
  categoriesList: Categories[] = []
  pages: Page[]= []
  currentPageId: number = 0;
  books: Book[]= [];
  pageIdDispo: number = 0;

  constructor(private formBuilder: FormBuilder, private bookService: BookService, private router: Router, private categoriesService: CategoriesService, private userService: UserService, private pageService: PageService) {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      resume: ['', Validators.required],
      categories: [[], Validators.required],
    });
  }

  ngOnInit(){
    this.currentUser = this.userService.getCurrentUserFromLocalStorage();
    if(!this.currentUser){
      this.router.navigate(['/main-page'])
    }
    this.categoriesService.getCategories().subscribe(
      (categories) => {
        this.categoriesList = categories;
      }
    )
    this.bookService.getBooks().subscribe(
      (books) => {
        this.books = books;
      }
    )
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const formData = this.bookForm.value;
      this.pageService.getPages().subscribe((pages) => {
        this.pageIdDispo = pages.length
      })
      const newPage: Page = {
        id: this.pageIdDispo,
        title: 'nouveau livre',
        content: 'nouveau livre',
        createdAt: new Date(),
        updatedAt: null,
        bookId: this.books.length + 1
      }
      this.bookService.addBook(formData).subscribe(() => {
        this.pageService.addPage(newPage).subscribe(() => {
          const idToRedirect: number = this.books.length +1
          localStorage.setItem('user_logged', JSON.stringify(this.currentUser));
          this.router.navigate(['/book', idToRedirect]);
        })
      }, error => {
        console.error('Erreur lors de l\'ajout du livre :', error);
      });
    }
  }

  Cancel(): void{
    localStorage.setItem('user_logged', JSON.stringify(this.currentUser));
    this.router.navigate(['/main-page'])
  }
}

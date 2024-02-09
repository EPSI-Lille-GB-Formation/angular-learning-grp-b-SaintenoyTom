import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { PageService } from '../page.service';
import { Book } from '../book';
import { Page } from '../page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categories } from '../categories';
import { CategoriesService } from '../categories.service';
import { UserService } from '../user.service';
import { Users } from '../users';

@Component({
  selector: 'app-modify-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <form (ngSubmit)="saveChanges()" #bookForm="ngForm" style="margin-left: 20px;">
  <div>
    <label for="title">Titre:</label>
    <input type="text" id="title" name="title" [(ngModel)]="editableBook.title" *ngIf="editableBook" required>
  </div>
  <div>
    <label for="image">Image URL:</label>
    <input type="text" id="image" name="image" [(ngModel)]="editableBook.image" *ngIf="editableBook">
  </div>
  <div>
    <label for="categories">Catégories:</label>
    <select id="categories" name="categories" [(ngModel)]="editableBook.categorieId" *ngIf="editableBook" multiple>
      <option *ngFor="let category of categoriesList" [value]="category.id">{{ category.label }}</option>
    </select>
  </div>
  <div class="pages">
    <label for="pages">Pages:</label>
    <textarea id="pages" name="pages" [(ngModel)]="pages[currentPageId].content" rows="1"></textarea>
  </div>
  <button type="submit" [disabled]="bookForm.invalid">Enregistrer</button>
  <button type="button" (click)="cancelEditing()">Annuler</button>
</form>
<div class="navigation-buttons">
      <div>
      <button (click)="previousPage()" *ngIf="currentPageId > 0">Page précedente</button>
      </div>
      <div>
      <p>{{this.currentPageId + 1}} / {{pages.length}}</p>
      </div>
      <div>
      <button (click)="nextPage()" *ngIf="currentPageId < pages.length - 1">Page Suivante</button>
      </div>
</div>
  `,
  styleUrl: './modify-book.component.css'
})
export class ModifyBookComponent{
  book: Book | null = null;
  pages: Page[] = [];
  currentPageId: number = 0;
  editableBook: Book | null = null;
  editablePages: Page[] = [];
  categoriesList: Categories[] = [];
  currentUser: Users | null= null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private pageService: PageService,
    private categoriesService: CategoriesService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.bookService.getBookById(bookId).subscribe(
        (book) => {
          this.book = book;
          this.editableBook = book;
          this.pageService.getPagesByBookId(parseInt(bookId)).subscribe(
            (pages) => {
              this.pages = pages;
              this.editablePages = pages;
            },
            (error) => {
              console.error('Erreur affichage des pages:', error);
            }
          );
        },
        (error) => {
          console.error('Erreur affichage des details du livre:', error);
        }
      );
    }
    this.categoriesService.getCategories().subscribe(
      (categories) => {
        this.categoriesList = categories;
      }
    )
    this.currentUser = this.userService.getCurrentUserFromLocalStorage();
    if(!this.currentUser){
      this.router.navigate(['/main-page'])
    }
  }

  previousPage(): void {
    if (this.currentPageId > 0) {
      this.currentPageId--;
    }
  }

  nextPage(): void {
    if (this.currentPageId < this.pages.length - 1) {
      this.currentPageId++;
    }
  }

  cancelEditing(): void {
    this.loadBook(); 
    this.loadPages();
    localStorage.setItem('user_logged', JSON.stringify(this.currentUser));
    this.router.navigate(['/book', this.book?.id])
  }

  saveChanges(): void {
    if(this.editableBook){
    this.editableBook.updatedAt = new Date();
    this.bookService.updateBook(this.editableBook).subscribe(
      () => {
        if(this.editablePages)
        this.pageService.updatePages(this.editablePages).subscribe(
          () => {
            localStorage.setItem('user_logged', JSON.stringify(this.currentUser));
            this.router.navigate(['/book', this.book?.id])
          },
          (error) => {
            console.error('Erreur lors de la sauvegarde des modifications :', error);
          }
          );
      },
      (error) => {
        console.error('Erreur lors de la sauvegarde des modifications :', error);
      }
    );
    }
  }

  private loadBook(): void {
    if(this.book)
    this.bookService.getBookById(this.book.id.toString()).subscribe(
      (book) => {
        this.editableBook = book;
      },
      (error) => {
        console.error('Erreur lors du chargement du livre :', error);
      }
    );
  }

  private loadPages(): void{
    if(this.book)
    this.pageService.getPagesByBookId(this.book?.id).subscribe(
      (pages) => {
        this.editablePages = pages;
      },
      (error) => {
        console.error('Erreur lors du chargement des pages :', error);
      })
  }
}

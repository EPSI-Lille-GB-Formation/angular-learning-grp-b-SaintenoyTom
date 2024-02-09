import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { PageService } from '../page.service';
import { Book } from '../book';
import { Page } from '../page';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categories } from '../categories';
import { CategoriesService } from '../categories.service';
import { UserService } from '../user.service';
import { Users } from '../users';

@Component({
  selector: 'app-modify-book',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
  <p>Dernière mise à jour: {{this.book?.updatedAt}}</p>
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
    <label for="resume">Résumé:</label>
    <input type="text" id="resume" name="resume" [(ngModel)]="editableBook.resume" *ngIf="editableBook">
  </div>
  <div>
    <label for="categories">Catégories:</label>
    <select id="categories" name="categories" [(ngModel)]="editableBook.categorieId" *ngIf="editableBook" multiple>
      <option *ngFor="let category of categoriesList" [value]="category.id">{{ category.label }}</option>
    </select>
  </div>
  <div class="pages">
    <label for="pages">Pages:</label>
    <textarea id="pages" name="pages" [(ngModel)]="this.pages[currentPageId].content" rows="1"></textarea>
  </div>
  <button type="submit" [disabled]="bookForm.invalid">Enregistrer</button>
  <button type="button" (click)="cancelEditing()">Annuler</button>
</form>
<div class="navigation-buttons">
      <div>
      <button (click)="previousPage()" *ngIf="currentPageId > 0">Page précédente</button>
      </div>
      <div>
      <p>{{this.currentPageId + 1}} / {{pages.length}}</p>
      </div>
      <div>
      <button (click)="nextPage()" *ngIf="currentPageId < pages.length - 1">Page Suivante</button>
      </div>
</div>
<div><button (click)="deletePage(currentPageId + 1)">Supprimer la page actuelle</button></div>


<h2>Ajouter une nouvelle page</h2>
<form [formGroup]="pageForm" (ngSubmit)="addPage()">
  <label for="title">Titre de la page :</label>
  <input id="title" formControlName="Title">

  <label for="Content">Contenu de la page :</label>
  <textarea id="Content" formControlName="content"></textarea>

  <button type="submit">Ajouter la page</button>
</form>
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
  pageForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private pageService: PageService,
    private categoriesService: CategoriesService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.pageForm = this.formBuilder.group({
      Title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

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
              console.log(this.pages);
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

  addPage(): void {
    if (this.pageForm.valid) {
      this.pageForm.value.createdAt= new Date(),
      this.pageForm.value.updatedAt= null,
      this.pageForm.value.bookId= this.book?.id;
      this.pageForm.value.id = this.pages.length + 1
      console.log(this.pageForm.value)
      console.log(this.pages)
      this.pageService.addPage(this.pageForm.value).subscribe(() => {
        if(this.book)
        this.pageService.getPagesByBookId(this.book.id).subscribe(pages => {
          this.pages = pages;
          console.log(this.pages)
        });
        this.pageForm = this.formBuilder.group({
          Title: ['', Validators.required],
          content: ['', Validators.required]
        });
      });
    }
  }

  deletePage(pageId: number): void{
    this.pageService.deletePage(pageId).subscribe(
      () => {
        if(this.book)
        this.pageService.getPagesByBookId(this.book?.id).subscribe(
          (pages) => {
            this.pages = pages;
            this.editablePages = pages;
            if (this.currentPageId != 1)
            this.currentPageId = this.currentPageId - 1;
          },
          (error) => {
            console.error('Erreur lors du chargement des pages :', error);
          })
    },
    (error) => {
      console.error('Erreur lors de la suppression des pages :', error);
    });
  }
}

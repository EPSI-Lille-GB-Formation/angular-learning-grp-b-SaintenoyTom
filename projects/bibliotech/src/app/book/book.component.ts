import { Component, HostListener } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { CommonModule } from '@angular/common';
import { Categories } from '../categories';
import { CategoriesService } from '../categories.service';
import { Page } from '../page';
import { PageService } from '../page.service';
import { UserService } from '../user.service';
import { Users } from '../users';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div *ngIf="isLogged;" class='header'>
  <button (click)="return()">Retour</button>
  </div>
  <div class="container" style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
  <h1>{{this.book?.title}}</h1>
  <div class="categories">
  <h2 style ="margin-bottom=0;">Catégories du livre : </h2>
    <table>
      <tbody>
        <tr *ngIf="book && categoriesList">
          <ng-container *ngFor="let category of categoriesList">
            <td *ngIf="book.categorieId?.includes(category.id)">{{ category.label }}</td>
          </ng-container>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="pages">
    <p> {{this.pages[currentPageId].content}} </p>
  </div>
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
</div>
  `,
  styleUrl: './book.component.css',
  providers: [LoginService, BookService, CategoriesService, UserService]
})
export class BookComponent {
  book: Book | null = null;
  categoriesList: Categories[] = [];
  pages: Page[] = [];
  currentPageId: number = 0;
  currentUser: Users | null = null;

  constructor(private bookService: BookService, private router: Router, private aRouter: ActivatedRoute, private loginService: LoginService, private categoriesService: CategoriesService, private pageService: PageService, private userService: UserService){}

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    this.return();
  }

  ngOnInit():void {
    if(!this.isLogged){
      this.router.navigate(['/main-page']);
    }else{
      this.currentUser = this.userService.getCurrentUserFromLocalStorage();
      const bookId = this.aRouter.snapshot.paramMap.get('id'); 
      if (bookId){
        this.bookService.getBookById(bookId).subscribe(
          (book) => {
            this.book = book;
            this.pageService.getPagesByBookId(this.book.id).subscribe(
              pages => {
                this.pages = pages;
              },
              error => {
                console.error('Erreur lors de la récupération des pages :', error)
              }
            )
          },
          (error) => {
            console.error('Erreur lors de la récupération des détails du livre :', error);
          }
        );
      }
      this.categoriesService.getCategories().subscribe(
        categories => {
          this.categoriesList = categories;
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

  getCategoryById(categoryId: number): Categories | undefined {
    return this.categoriesList.find(category => category.id === categoryId);
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

  return(): void{
    localStorage.setItem('user_logged', JSON.stringify(this.currentUser));
    this.router.navigate(['/main-page']);
  }
}

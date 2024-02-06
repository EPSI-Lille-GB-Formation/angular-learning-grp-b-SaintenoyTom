import { Component } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [],
  template: `
  <p>{{this.book?.title}}</p>
  `,
  styleUrl: './book.component.css'
})
export class BookComponent {
  book: Book | null = null;

  constructor(private bookService: BookService, private router: Router, private aRouter: ActivatedRoute, private loginService: LoginService){}

  ngOnInit():void {
    if(!this.isLogged){
      this.router.navigate(['/main-page']);
    }else{
      const bookId = this.aRouter.snapshot.paramMap.get('id'); 
      if (bookId){
        this.bookService.getBookById(bookId).subscribe(
          (book) => {
            this.book = book;
          },
          (error) => {
            console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
          }
        );
      }
    }
    
  }

  get isLogged(): boolean{
    return this.loginService.getIsLogged();
  }
}

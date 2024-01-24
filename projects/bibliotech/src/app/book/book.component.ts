import { Component } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [],
  template: `
  
  `,
  styleUrl: './book.component.css'
})
export class BookComponent {
  books: Book[] = [];

  constructor(private bookService: BookService){}

  ngOnInit():void {
    this.bookService.getBooks().subscribe(
      (books) => {
        this.books = books;
      },
      (error) => {
        console.error('Erreur lors de la récupération des livres :', error);
      }
    );
  }
}

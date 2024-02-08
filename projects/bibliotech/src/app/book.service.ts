import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Book } from './book'

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private userUrl = '/api/BOOKS'; 

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.userUrl).pipe(
      catchError(error => {
        console.error('BookService - Erreur lors de la récupération des books :', error);
        throw error;
      })
    );
  }

  getBookById(bookId: string): Observable<Book> {
    const url = `${this.userUrl}/${bookId}`;
    return this.http.get<Book>(url).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des détails du livre :', error);
        throw error;
      })
    );
  }

  updateBook(book: Book): Observable<void> {
    const url = `${this.userUrl}/${book.id}`; // Construire l'URL pour la mise à jour du livre
    return this.http.put<void>(url, book);
  }

  deleteBook(bookId: number): Observable<void> {
    const url = `${this.userUrl}/${bookId}`;
    return this.http.delete<void>(url);
  }
}

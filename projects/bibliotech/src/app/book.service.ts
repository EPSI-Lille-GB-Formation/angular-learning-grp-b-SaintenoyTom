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
    console.log('BookService - Tentative de récupération des utilisateurs depuis l\'API...');
    return this.http.get<Book[]>(this.userUrl).pipe(
      tap(bookList => console.log('UserService - Utilisateurs récupérés :', bookList)),
      catchError(error => {
        console.error('UserService - Erreur lors de la récupération des utilisateurs :', error);
        throw error;
      })
    );
  }
}

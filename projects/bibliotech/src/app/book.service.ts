import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private bookUrl = 'api/books';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(this.bookUrl)
  }
}

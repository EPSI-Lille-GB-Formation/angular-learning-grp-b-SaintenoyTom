import { Injectable } from '@angular/core';
import { Page } from './page';
import { Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private userUrl = '/api/PAGES'; 

  constructor(private http: HttpClient) {}

  getPagesByBookId(bookId: number): Observable<Page[]> {
    const url = `${this.userUrl}?bookId=${bookId}`;
    return this.http.get<Page[]>(url).pipe(
      catchError(error => {
        console.error('PageService - Erreur lors de la récupération des pages :', error);
        throw error;
      })
    );
  }
}

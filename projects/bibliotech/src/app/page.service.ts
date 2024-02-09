import { Injectable } from '@angular/core';
import { Page } from './page';
import { Observable, catchError, forkJoin, map } from 'rxjs';
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

  updatePages(pages: Page[]): Observable<void> {
    const updateRequests: Observable<void>[] = pages.map(page =>
      this.http.put<void>(`${this.userUrl}/${page.id}`, page)
    );
    return forkJoin(updateRequests).pipe(
      map(() => {}),
      catchError(error => {
        console.error('Erreur lors de la mise à jour des pages :', error);
        throw error;
      })
    );
  }

  addPage(newPage: Page): Observable<Page>{
    return this.http.post<Page>(this.userUrl, newPage);
  }

  deletePage(pageId: number): Observable<any> {
    const url = `${this.userUrl}/${pageId}`;
    return this.http.delete(url);
  }

  getPages(): Observable<Page[]> {
    return this.http.get<Page[]>(this.userUrl)
  }
}

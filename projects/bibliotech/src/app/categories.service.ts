import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categories } from './categories';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private userUrl = '/api/CATEGORIES'; 

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.userUrl).pipe(
      catchError(error => {
        console.error('CategoriesService - Erreur lors de la récupération des Categories :', error);
        throw error;
      })
    );
  }
}

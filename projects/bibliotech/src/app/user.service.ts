// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Users } from './users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = '/api/USERS'; // Utilise le même chemin que dans l'API simulée

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.userUrl).pipe(
      tap(userList => console.log('UserService - Utilisateurs récupérés')),
      catchError(error => {
        console.error('UserService - Erreur lors de la récupération des utilisateurs :', error);
        throw error;
      })
    );
  }
}

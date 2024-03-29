// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, switchMap, tap } from 'rxjs';
import { Users } from './users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = '/api/USERS'; // Utilise le même chemin que dans l'API simulée

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.userUrl).pipe(
      catchError(error => {
        console.error('UserService - Erreur lors de la récupération des utilisateurs :', error);
        throw error;
      })
    );
  }

  getUserById(userId: string): Observable<Users> {
    const url = `${this.userUrl}/${userId}`;
    return this.http.get<Users>(url).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
        throw error;
      })
    );
  }

  getCurrentUserFromLocalStorage(id?: string): Users | null {
    const userString = localStorage.getItem('user_logged');
    localStorage.removeItem('user_logged');
    return userString ? JSON.parse(userString) : null;
  }

  updateUser(user: Users): Observable<Users> {
    const url = `${this.userUrl}/${user.id}`;
    return this.http.put<Users>(url, user);
  }

  deleteUser(userId: number): Observable<void> {
    const url = `${this.userUrl}/${userId}`;
    return this.http.delete<void>(url);
  }

  register(user: any): Observable<any> {
    const url = `${this.userUrl}/register`;
    return this.http.post<any>(url, user).pipe(
      catchError(error => {
        console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
        throw error;
      })
    );
  }

  getNextAvailableId(): Observable<number> {
    return this.http.get<Users[]>(this.userUrl).pipe(
      map(users => {
        const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
        return maxId + 1;
      })
    );
  }


}

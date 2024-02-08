import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../user.service';
import { Users } from '../users';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../login.service';
import { BookService } from '../book.service';
import { Book } from '../book';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div *ngIf="isLogged;" class='header'>
  <button (click)="return()">Retour</button>
  </div>
  <div *ngIf="user" class="user-details">
  <h2>{{ user.firstname }} {{ user.lastname }}</h2>
  <p>Email: {{ user.email }}</p>
  <p>Rôle: {{ user.role }}</p>

  <div *ngIf="isEditing">
    <!-- Formulaire pour les modifications -->
    <label for="editFirstname">Prénom:</label>
    <input id="editFirstname" [(ngModel)]="editableUser.firstname" *ngIf="editableUser" />

    <label for="editLastname">Nom:</label>
    <input id="editLastname" [(ngModel)]="editableUser.lastname" *ngIf="editableUser"/>

    <label for="editEmail">Email:</label>
    <input id="editEmail" [(ngModel)]="editableUser.email" *ngIf="editableUser"/>

    <label for="editPassword">Nouveau mot de passe:</label>
    <input id="editPassword" [(ngModel)]="editableUser.password" *ngIf="editableUser"/>

    <label for="editRole" *ngIf="isCurrentUserAdmin() && editableUser">Rôle:</label>
    <select id="editRole" [(ngModel)]="editableUser.role" *ngIf="isCurrentUserAdmin() && editableUser">
      <option value="user">Utilisateur</option>
      <option value="admin">Administrateur</option>
    </select>

    <!-- Autres champs éditables -->

    <button (click)="saveChanges()">Enregistrer</button>
    <button (click)="cancelEditing()">Annuler</button>
  </div>

  <div *ngIf="!isEditing">
    <!-- Bouton pour commencer l'édition -->
    <button (click)="startEditing()">Modifier</button>
  </div>
</div>
  `,
  styleUrl: './user-page.component.css',
  providers: [LoginService, BookService, UserService]
})
export class UserPageComponent {
  user: Users | null = null;
  editableUser: Users | null = null;
  isEditing = false;
  booksList: Book[] = [];
  currentUser: Users | null = null;

  constructor(private aRouter: ActivatedRoute, private userService: UserService, private loginService: LoginService, private router: Router, private bookService: BookService){}

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    this.return();
  }

  ngOnInit(): void {
    if(!this.isLogged){
      this.router.navigate(['/main-page']);
    }else{
      this.bookService.getBooks().subscribe(
        books => {
          this.booksList = books;
        },
        error => {
          console.error('Erreur lors de la récupération des livres :', error);
        }
      );
      const userId = this.aRouter.snapshot.paramMap.get('id'); // Assure-toi que tu as défini la route pour inclure l'ID
      if (userId){
        this.userService.getUserById(userId).subscribe(
          (user) => {
            this.user = user;
            this.editableUser = { ...user };
            this.editableUser.password = "";
            this.currentUser = this.userService.getCurrentUserFromLocalStorage();
          },
          (error) => {
            console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
          }
        );
      }
    }
    
  }

  startEditing(): void {
    this.isEditing = true;
  }

  cancelEditing(): void {
    this.isEditing = false;
    // Réinitialise la copie modifiable aux valeurs actuelles
    this.editableUser = this.user ? { ...this.user } : null;
  }

  saveChanges(): void {
    if (this.editableUser) {
      this.editableUser.password = CryptoJS.SHA256(this.editableUser.password).toString();
      this.userService.updateUser(this.editableUser).subscribe(
        () => {
          this.user = this.editableUser ? { ...this.editableUser } : null;          
          this.isEditing = false;
          if(this.user?.id === this.currentUser?.id){
            this.currentUser = this.user;
          }
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        }
      );
    }
  }

  get isLogged(): boolean{
    return this.loginService.getIsLogged();
  }

  return(): void{
    localStorage.setItem('user_logged', JSON.stringify(this.currentUser));
    this.router.navigate(['/main-page']);
  }

  isCurrentUserAdmin() : boolean{
    return this.currentUser?.role === 'admin';
  }

}

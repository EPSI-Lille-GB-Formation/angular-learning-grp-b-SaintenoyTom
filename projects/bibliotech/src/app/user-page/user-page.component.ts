import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute} from '@angular/router';
import { UserService } from '../user.service';
import { Users } from '../users';
;

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div *ngIf="user" class="user-details">
    <h2>{{ user.firstname }} {{ user.lastname }}</h2>
    <p>Email: {{ user.email }}</p>
  </div>
  `,
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {
  user: Users | null = null;

  constructor(private router: ActivatedRoute, private userService: UserService){}

  ngOnInit(): void {
    const userId = this.router.snapshot.paramMap.get('id'); // Assure-toi que tu as défini la route pour inclure l'ID
    if (userId){
      this.userService.getUserById(userId).subscribe(
        (user) => {
          this.user = user;
        },
        (error) => {
          console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
        }
      );
    }
  }

}

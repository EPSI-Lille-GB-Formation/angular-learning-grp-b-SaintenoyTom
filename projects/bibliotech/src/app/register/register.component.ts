import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { Users } from '../users';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
  <div class="container">
  <h2>Inscription</h2>
  <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
  <div>
    <label for="firstname">Prénom:</label>
    <input type="text" id="firstname" formControlName="firstname">
  </div>
  <div>
    <label for="lastname">Nom:</label>
    <input type="text" id="lastname" formControlName="lastname">
  </div>
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" formControlName="email">
  </div>
  <div>
    <label for="password">Mot de passe:</label>
    <input type="password" id="password" formControlName="password">
  </div>
  <button type="submit" [disabled]="registerForm.invalid">S'inscrire</button>
</form>
  `,
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  currentUser: Users | null = null
  private isLogged: boolean = !!localStorage.getItem('isLogged');
  nextAvailableId: number =0;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private loginService: LoginService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      role: ['']
    });
  }

  ngOnInit(){

  }

  get form() { return this.registerForm.controls; }

  onSubmit() {
    const role = "user";
    this.registerForm.patchValue({ role: role });
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const hashedPassword = CryptoJS.SHA256(this.registerForm.value.password).toString();
    this.registerForm.patchValue({ password: hashedPassword });
    this.userService.register(this.registerForm.value).subscribe(
      () => {
        this.currentUser = this.registerForm.value;
        localStorage.setItem('user_logged', JSON.stringify(this.currentUser));
        this.loginService.setIsLoggedToTrue();
        this.isLogged = true;
        localStorage.setItem('isLogged', this.isLogged ? 'true' : 'false');
        this.router.navigate(['/main-page']);
      },
      error => {
        console.error('Erreur lors de l\'inscription :', error);
      }
    );
  }
}

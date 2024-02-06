import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../users';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [],
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.css'
})
export class AdministrationComponent {
  user: Users | null = null;

  constructor(private router: Router, private loginService: LoginService){}

  ngOnInit(){
    if(!this.isLogged){
      this.router.navigate(['/main-page']);
    }else{
    }
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    this.return();
  }

  return(): void{
    localStorage.setItem('user_logged', JSON.stringify(this.user));
    this.router.navigate(['/main-page']);
  }

  get isLogged(): boolean{
    return this.loginService.getIsLogged();
  }
}

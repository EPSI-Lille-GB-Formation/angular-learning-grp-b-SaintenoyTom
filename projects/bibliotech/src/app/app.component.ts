import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginService } from './login.service';
import { UserService } from './user.service';
import { BookService } from './book.service';


@Component({
    selector: 'app-root',
    standalone: true,
    template: `
    <div>
    <router-outlet></router-outlet>
    </div>
    `,
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet],
    providers: [LoginService, UserService, BookService],
})
export class AppComponent {
}

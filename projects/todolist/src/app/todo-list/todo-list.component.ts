import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TodobordureDirective } from '../todobordure.directive';
import { TODOS } from '../mock-todo';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [CommonModule, TodoComponent, TodobordureDirective, RouterOutlet],
  template: `
  <h1>Liste des choses à faire</h1>
        <a href="#" role="button">A faire</a>
        <a href="#" role="button">Terminée</a>
        <ng-container  *ngFor="let todo of todoList">
          <app-todo [value]="todo" />
        </ng-container>
  `,
  styles: [`
    
`]
})
export class TodoListComponent {
  todoList = TODOS;
}

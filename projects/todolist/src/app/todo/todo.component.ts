import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TodobordureDirective } from '../todobordure.directive';
import { Todo } from '../todo';
import { FormsModule } from '@angular/forms';
import {TODOS} from "../mock-todo"

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, TodobordureDirective],
  template: `
  <article *ngIf="todo" bordure-highlight>
          <div class="grid">
          <label for="todo-{{todo.id}}">
            <input type="checkbox" id="todo-{{todo.id}}" name="todo-{{todo.id}}" [checked]="todo.isCompleted" >
            {{todo.title}}
          </label>
          <div class = "action">
            <a href="#">Edit</a>
            <a href="#" (click)="deleteTodo()">Delete</a>
        </div>
        </div>
        </article>
  `,
  styles: [`
  .action{
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }

    .action a{
      margin-left: 8px;
    }
  `]
})
export class TodoComponent {
  @Input("value")
  todo!: Todo
  checkboxValue!: boolean

  @Input("listTodo")
  todoList!:Todo[]

  deleteTodo(){
    TODOS.splice(this.todoList.indexOf(this.todo),1)
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodobordureDirective } from '../todobordure.directive';
import { Todo } from '../todo';
import { Router } from '@angular/router';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, TodobordureDirective],
  template: `
  <article *ngIf="todo" bordure-highlight>
          <div class="grid">
          <label for="todo-{{todo.id}}">
            <input type="checkbox" id="todo-{{todo.id}}" name="todo-{{todo.id}}" [checked]="todo.isCompleted" (change)="OnCheck()" />
            {{todo.title}}
          </label>
          <div class = "action">
          <a href="#">Edit</a>
            <a (click)="goToTaskDetail()">View</a>
            <a href="#" (click)="deleteTodo($event)">Delete</a>
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
  todo!: Todo | undefined
  checkboxValue!: boolean

  constructor(
    private router: Router, private todoService: TodoService
  ){}

  @Output()
  deleteTodoEvent = new EventEmitter<string>();

  @Input("listTodo")
  todoList!:Todo[]

  deleteTodo(event: Event){
    event.preventDefault()
    if (this.todo){
    this.todoService.deleteTodo(this.todo.id).subscribe(todo => console.log(todo))
    this.deleteTodoEvent.emit()
    }
  }

  goToTaskDetail(){
    this.router.navigate(['/task', this.todo?.id])
  }

  OnCheck(){
    if (this.todo){
      this.todo.isCompleted = !this.todo?.isCompleted;
      console.table(this.todo)
    }
  }
}

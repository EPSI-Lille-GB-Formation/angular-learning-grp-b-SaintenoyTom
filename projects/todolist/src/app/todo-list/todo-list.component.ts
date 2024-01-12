import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TodobordureDirective } from '../todobordure.directive';
import { TodoComponent } from '../todo/todo.component';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [CommonModule, TodoComponent, TodobordureDirective, RouterOutlet],
  template: `
  <h1>Liste des choses à faire</h1>
        <a href="#" role="button" [class.secondary]="!completedFiler && !showAll" (click)="onClickTodo()">A faire</a>
        <a href="#" role="button" [class.secondary]="completedFiler && !showAll" (click)="onClickTodoCompleted()">Terminée</a>
        <a href="#" role="button" [class.secondary]="showAll" (click)="onClickTodoShowAll()">Afficher tout</a>
        <ng-container  *ngFor="let todo of todoList">
          <app-todo [value]="todo" [listTodo]="todoList" *ngIf="(todo.isCompleted == completedFiler) || (showAll)" />
        </ng-container>
  `,
  styles: [`
    
`]
})
export class TodoListComponent {
  todoList:Todo[] = [];
  completedFiler = false;
  showAll=false;
  constructor(private todoService: TodoService){
    console.table(this.todoList);
  }
  ngOnInit(): void{
    this.todoService.getTodoList().subscribe(todos => this.todoList = todos)
  }
  onClickTodo(): void{
    this.completedFiler=false;
    this.showAll = false;
  }
  onClickTodoCompleted(): void{
    this.completedFiler = true;
    this.showAll = false;
  }
  onClickTodoShowAll(){
    this.showAll = !this.showAll
  }
}

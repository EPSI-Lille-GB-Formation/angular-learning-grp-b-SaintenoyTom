import { Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TaskComponent } from './task/task.component';

export const routes: Routes = [
    {path: '', component: TodoListComponent},
    {path: 'task/:id', component: TaskComponent}
];
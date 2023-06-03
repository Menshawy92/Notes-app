import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoListRoutingModule } from './todo-list-routing.module';
import { ListTodoComponent } from './components/list-todo/list-todo.component';
import { ItemComponent } from './components/item/item.component';
import { AddTaskComponent } from './components/add-task/add-task.component';


@NgModule({
  declarations: [
    ListTodoComponent,
    ItemComponent,
    AddTaskComponent
  ],
  imports: [
    CommonModule,
    TodoListRoutingModule,
    ReactiveFormsModule
  ]
})
export class TodoListModule { }

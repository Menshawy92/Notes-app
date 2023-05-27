import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoListRoutingModule } from './todo-list-routing.module';
import { ListTodoComponent } from './components/list-todo/list-todo.component';
import { ItemComponent } from './components/item/item.component';


@NgModule({
  declarations: [
    ListTodoComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    TodoListRoutingModule
  ]
})
export class TodoListModule { }

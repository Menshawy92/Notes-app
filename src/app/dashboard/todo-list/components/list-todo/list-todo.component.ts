import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { filter, first, pipe, Subscription } from 'rxjs';
import { listTodo } from '../../models/toDoList';
@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
})
export class ListTodoComponent implements OnInit {
  subscription: Subscription | any;
  allTasks: listTodo[] | any

  constructor(private listService: TasksService) { }

  ngOnInit() {
    this.getAllTasks()
  }

  getAllTasks() {
    this.subscription = this.listService.listTask().subscribe({
      next: (data) => {
        this.allTasks = data
      },
      error: (error) => {
        console.log("error", error) // will stop stream
      },
      complete: () => {
        console.log("ADS is finished!")
      }
    })
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { filter, first, pipe, Subscription } from 'rxjs';
import { listTodo } from '../../models/toDoList';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
})
export class ListTodoComponent implements OnInit {
  subscription: Subscription | any;
  allTasks: listTodo[] | any;
  data:[] | any
  isEdit : boolean = false;

  constructor(private listService: TasksService,private _router:Router) { }

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

  updateTask(item: [] | any){
    let status = this.isEdit = true
    this.data = item
    console.log("data",this.data)
    const navigationExtras: NavigationExtras = {
      queryParams: {...item,isMode:status},
      skipLocationChange: true,
    }
    this._router.navigate(['add-task'],navigationExtras);
    console.log("navigationExtras",navigationExtras)
  }

  deleteTask(id:number|any){
    this.subscription = this.listService.deleteTask(id).subscribe(res => {
      alert("deleted!")
      this.getAllTasks() 
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

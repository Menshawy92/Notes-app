import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AddTaskComponent } from './todo-list/components/add-task/add-task.component';

const routes: Routes = [{
  path: '', component: LayoutComponent, children: [
    {path:'add-task', component:AddTaskComponent},
    { path: 'todoList', loadChildren: () => import('./todo-list/todo-list.module').then(m => m.TodoListModule) },
    { path: 'notesList', loadChildren: () => import('./notes-list/notes-list.module').then(m => m.NotesListModule) },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

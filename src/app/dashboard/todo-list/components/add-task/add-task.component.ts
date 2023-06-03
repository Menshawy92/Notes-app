import * as moment from 'moment';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TasksService } from '../../services/tasks.service';
import { CLASSIFICATION_LIST, PRIORITY_LIST } from 'src/app/constant/selectData.constants';
import {format} from 'date-fns'


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
})
export class AddTaskComponent implements OnInit {
  addForm: FormGroup | any;
  subscription: Subscription | any;
  dataId: [] | any;
  PriorityList = [...PRIORITY_LIST]
  classification = [...CLASSIFICATION_LIST]

  constructor(private route: ActivatedRoute, private _router: Router, private fb: FormBuilder, private listService: TasksService) {
    this.dataId = this.route.snapshot.queryParams;
    console.log("dataId", this.dataId.classification)
  }

  ngOnInit() {
    this.getForm()
  }

  getForm() {
    this.addForm = this.fb.group({
      title: [this.dataId.title || '', Validators.required],
      formDate: [this.dataId ? new Date(this.dataId.formDate.split('-').reverse().join('-')).toISOString() :  '', Validators.required],
      description: [this.dataId.description || '', Validators.required],
      priority: [this.dataId.priority || '', Validators.required],
      classification: [this.dataId.classification || '', Validators.required],
      estimation: [this.dataId.estimation || '', Validators.required],
    })
  }

  allActions() {
    this.dataId.isMode ? this.getUpdate() : this.getData()
  }

  getData() {
    const data = {
      ...this.addForm.value,
      formDate: moment(this.addForm.value['formDate']).format('DD-MM-YYYY')
    }
    this.subscription = this.listService.addTask(data).subscribe(res => {
      this.close()
    })
  }

  getUpdate() {
    let taskId = this.dataId.id
    const data = {
      ...this.addForm.value,
      // formDate: moment(this.addForm.value['formDate']).format('DD-MM-YYYY')
      FormData:moment(this.addForm.value['formDate']).format('DD-MM-YYYY')
    }
    this.subscription = this.listService.updateTask(taskId, data).subscribe(res => {
      this.close()
    })
  }



  close() {
    // this._location.back()
    this._router.navigate(['/todoList']);
  }
}

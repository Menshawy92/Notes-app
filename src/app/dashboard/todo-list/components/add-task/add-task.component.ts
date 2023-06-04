import * as moment from 'moment';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TasksService } from '../../services/tasks.service';
import { CLASSIFICATION_LIST, PRIORITY_LIST } from 'src/app/constant/selectData.constants';
import { format } from 'date-fns'
import { CustomValidationService } from 'src/app/core/services/customvalidation.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
})
export class AddTaskComponent implements OnInit {
  addForm: FormGroup | any;
  subscription: Subscription | any;
  dataId: [] | any;
  isSubmitted: boolean = false;
  PriorityList = [...PRIORITY_LIST]
  classification = [...CLASSIFICATION_LIST]

  constructor(private route: ActivatedRoute, private _router: Router, private fb: FormBuilder,
    private listService: TasksService, private _customValidation:CustomValidationService,private _toastr: ToastrService) {
    this.dataId = this.route.snapshot.queryParams;
    console.log("dataId", this.dataId.classification)
  }

  ngOnInit() {
    this.getForm()
  }

  getForm() {
    this.addForm = this.fb.group({
      title: new FormControl(this.dataId.title || '', [Validators.required, Validators.maxLength(20), Validators.minLength(4)]),
      formDate: new FormControl(this.dataId.formDate || '', [Validators.required, this._customValidation.lessThanToday()]),
      description: new FormControl(this.dataId.description || '', [Validators.required,Validators.maxLength(200), Validators.minLength(20)]),
      priority: new FormControl(this.dataId.priority || '', [Validators.required]),
      classification: new FormControl(this.dataId.classification || '', [Validators.required]),
      estimation: new FormControl(this.dataId.estimation || '', [Validators.required]),
    })
  }

  getControl(field: string) {
    return this.addForm.get(field);
  }

  isFieldInvalid(field: string) {
    const formField = this.addForm.get(field);
    return formField.invalid && (formField.touched || formField.dirty);
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
      this._toastr.success("yse!")
      this.close()
    })
  }

  getUpdate() {
    let taskId = this.dataId.id
    const data = {
      ...this.addForm.value,
      // formDate: moment(this.addForm.value['formDate']).format('DD-MM-YYYY')
      FormData: moment(this.addForm.value['formDate']).format('DD-MM-YYYY')
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

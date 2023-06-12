import { Component, Input, OnInit, Output, EventEmitter, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styles: ['.hold { background: #b7b7b796; opacity: 0.5;cursor: no-drop}.hold .hold-btn {border: 2px solid #36ff36}']
})
export class ItemComponent implements OnInit {
  @Input() tasks: [] | any;
  @Output() dataItem: EventEmitter<string> = new EventEmitter<string>();
  @Output() IdItem: EventEmitter<string> = new EventEmitter<string>();
  idTask: number | any
  isHold: boolean = false
  holdName: string = "hold"
  name: string | any
  constructor(private _router: Router, private renderer: Renderer2) { }

  ngOnInit() {
    const isHoldValue = localStorage.getItem('isHold');
    if (isHoldValue === 'true') {
      const taskItem = document.getElementById('taskItem');
      if (taskItem != null) {
        taskItem.classList.add('hold');
      }
    }
  }

  updateItem(item: any) {
    this.dataItem.emit(item)
  }

  deleteItem(id: number | any) {
    this.IdItem.emit(id)
  }

  holdTask(id: number | any) {
    const ID = this.idTask = id
    if (ID === id) {
      this.isHold = !this.isHold;
      this.holdName = this.isHold ? "unHold" : "Hold";
      document.getElementById('taskItem')?.classList.toggle('hold')
      if (this.isHold) {
        localStorage.setItem('isHold',  JSON.stringify(this.isHold));
      } else {
        localStorage.removeItem('isHold');
      }
    }

  }
}

import { Component, Input, OnInit, Output, EventEmitter, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/getDataSearch.service';
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
  holdName: any = "hold"
  name: string | any
  filteredItems: [] | any;

  constructor(private _router: Router, private dataService: DataService) { }

  ngOnInit() {
    setTimeout(() => {
      this.holdTask(this.isHold);
    }, 100);
  }

  ngOnChanges() {
    this.dataService.currentData.subscribe(res => {
      this.filteredItems = res
    })
    this.dataService.resultData(this.tasks)
  }

  ngDoCheck() {
    const testClassAdded = localStorage.getItem('isHoldAdded') === 'true';
    if (testClassAdded) {
      const element = document.getElementById('taskItem');
      this.holdName = "unHold"
      if (element) {
        element.classList.add('hold');
      }
    }
    else if (!testClassAdded) {
      localStorage.removeItem('isHoldAdded');
      document.getElementById('taskItem')?.classList.remove('hold');
      this.holdName = "hold"
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
      // let x = this.holdName = this.isHold ? "unHold" : "Hold";
      document.getElementById('taskItem')?.classList.add('hold')
      if (this.isHold) {
        localStorage.setItem('isHoldAdded', 'true');
      } else {
        localStorage.removeItem('isHoldAdded');
      }
    }
  }
}

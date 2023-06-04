import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
})
export class ItemComponent implements OnInit {
  @Input() tasks: [] | any;
  @Output() dataItem: EventEmitter<string> = new EventEmitter<string>();
  @Output() IdItem: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  updateItem(item: any) {
    this.dataItem.emit(item)
  }

  deleteItem(id: number | any) {
    this.IdItem.emit(id)
  }

}

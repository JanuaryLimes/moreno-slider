import { IDynamicContext, DynamicContext } from './../game-logic/game-cell';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'slider-dynamic-cell',
  templateUrl: './dynamic-cell.component.html',
  styleUrls: ['./dynamic-cell.component.css']
})
export class DynamicCellComponent implements OnInit, IDynamicContext {
  context: DynamicContext;

  constructor() {
    this.context = new DynamicContext();
  }

  ngOnInit() {}
}

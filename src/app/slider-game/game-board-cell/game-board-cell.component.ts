import { DynamicCellComponent } from './../dynamic-cell/dynamic-cell.component';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { SliderManager } from '../game-logic/slider-manager';

@Component({
  selector: 'slider-game-board-cell',
  templateUrl: './game-board-cell.component.html',
  styleUrls: ['./game-board-cell.component.css']
})
export class GameBoardCellComponent implements OnInit {
  @Input() rowNumber: number;
  @Input() columnNumber: number;

  visibilityClass: string;

  @ViewChild(DynamicCellComponent) dynamiCell: DynamicCellComponent;

  constructor(private sliderManager: SliderManager, public elem: ElementRef) {}

  ngOnInit() {}

  onClick() {
    console.log(`row: ${this.rowNumber} col: ${this.columnNumber}`);
    this.sliderManager.GameCellClicked.next(this);
  }
}

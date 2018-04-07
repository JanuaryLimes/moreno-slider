import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { SliderManager } from '../game-logic/slider-manager';
import { GameCell } from '../game-logic/game-cell';

@Component({
  selector: 'slider-game-board-cell',
  templateUrl: './game-board-cell.component.html',
  styleUrls: ['./game-board-cell.component.css']
})
export class GameBoardCellComponent implements OnInit {
  @Input() rowNumber: number;
  @Input() columnNumber: number;

  constructor(private sliderManager: SliderManager, public elem: ElementRef) {}

  ngOnInit() {}

  onClick() {
    console.log(`row: ${this.rowNumber} col: ${this.columnNumber}`);
    this.sliderManager.GameCellClicked.next(
      new GameCell(this.rowNumber, this.columnNumber)
    );
  }
}

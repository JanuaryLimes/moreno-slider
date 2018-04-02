import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'slider-game-board-cell',
  templateUrl: './game-board-cell.component.html',
  styleUrls: ['./game-board-cell.component.css']
})
export class GameBoardCellComponent implements OnInit {
  @Input() rowNumber: number;
  @Input() columnNumber: number;

  constructor() {}

  ngOnInit() {}

  onClick() {
    console.log(`row: ${this.rowNumber} col: ${this.columnNumber}`);
  }
}

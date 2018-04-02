import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'slider-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  private rowCount = 4;
  private columnCount = 4;

  rows = [].constructor(this.rowCount);
  columns = [].constructor(this.columnCount);

  constructor() {}

  ngOnInit() {}
}

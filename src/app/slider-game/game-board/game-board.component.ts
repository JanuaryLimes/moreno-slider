import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  AfterViewInit
} from '@angular/core';
import { GameBoardCellComponent } from '../game-board-cell/game-board-cell.component';
import { SliderManager } from '../game-logic/slider-manager';

@Component({
  selector: 'slider-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  @ViewChildren(GameBoardCellComponent)
  cells: QueryList<GameBoardCellComponent>;

  private rowCount = 4;
  private columnCount = 4;

  rows = [].constructor(this.rowCount);
  columns = [].constructor(this.columnCount);

  constructor(private sliderManager: SliderManager) {
    sliderManager.BoardLoaded.subscribe(() => {
      this.boardLoaded();
    });
  }

  ngOnInit() {}

  boardLoaded(): any {
    this.sliderManager.updateGameCells(this.cells);
  }
}

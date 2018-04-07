import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { GameCell } from './game-cell';
import { GameBoardCellComponent } from '../game-board-cell/game-board-cell.component';

@Injectable()
export class SliderManager {
  GameCellClicked = new Subject<GameCell>();
  BoardLoaded = new Subject();

  gameCells: GameBoardCellComponent[] = new Array();

  constructor() {}
}

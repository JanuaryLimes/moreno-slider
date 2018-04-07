import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { GameCell } from './game-cell';

@Injectable()
export class SliderManager {
  GameCellClicked = new Subject<GameCell>();
  BoardLoaded = new Subject();

  gameCells: HTMLElement[] = new Array();

  constructor() {}
}

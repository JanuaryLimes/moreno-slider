import { Injectable, QueryList } from '@angular/core';
import { ShuffleManager } from './shuffle-manager';
import { MoveManager } from './move-manager';
import { Subject } from 'rxjs/Subject';
import { GameBoardCellComponent } from '../game-board-cell/game-board-cell.component';
import { GameCell, Consts } from './game-cell';

@Injectable()
export class SliderManager {
  private shuffleManager: ShuffleManager;
  private moveManager = new MoveManager();

  public GameCellClicked = new Subject<GameCell>();
  public BoardLoaded = new Subject();

  private gameCells: GameBoardCellComponent[] = new Array();

  constructor() {}

  // Metoda po wczytaniu komponentów planszy
  public updateGameCells(cells: QueryList<GameBoardCellComponent>): any {
    this.gameCells = new Array<GameBoardCellComponent>();
    cells.forEach(cell => {
      this.gameCells.push(cell);
    });

    this.loaded();
  }

  public clicked(gameCell: GameCell): any {
    this.moveManager.tryClick(gameCell);
  }

  private loaded() {
    console.log('loadedddd');

    this.setNumbers();
    this.hideLastComponent();

    this.shuffleManager = new ShuffleManager(this.gameCells);
  }

  private setNumbers() {
    this.gameCells.forEach((gameBoardCellComponent, index) => {
      gameBoardCellComponent.dynamiCell.context.num = index + 1;
    });
  }

  private hideLastComponent() {
    const cell = this.gameCells[this.gameCells.length - 1];
    cell.visibilityClass = Consts.HIDDEN;
    this.moveManager.hiddenComponent = cell;
  }
}

import { GameBoardCellComponent } from './../game-board-cell/game-board-cell.component';
import { Injectable, QueryList } from '@angular/core';
import { ShuffleManager } from './shuffle-manager';
import { MoveManager } from './move-manager';
import { Subject } from 'rxjs/Subject';
import { Consts } from './game-cell';

@Injectable()
export class SliderManager {
  private shuffleManager: ShuffleManager;
  private moveManager = new MoveManager();

  public BoardLoaded = new Subject();
  public GameCells: GameBoardCellComponent[] = new Array();

  constructor() {
    this.shuffleManager = new ShuffleManager(this, this.moveManager);
  }

  // Metoda po wczytaniu komponentów planszy
  public updateGameCells(cells: QueryList<GameBoardCellComponent>): any {
    this.GameCells = new Array<GameBoardCellComponent>();
    cells.forEach(cell => {
      this.GameCells.push(cell);
    });

    this.loaded();
  }

  public clicked(component: GameBoardCellComponent): any {
    this.moveManager.tryClick(component);
  }

  public shuffleClicked() {
    this.shuffleManager.shuffleBoard();
  }

  private loaded() {
    console.log('loadedddd');

    this.setNumbers();
    this.setHiddenComponent();
  }

  private setNumbers() {
    this.GameCells.forEach((gameBoardCellComponent, index) => {
      gameBoardCellComponent.dynamiCell.context.num = index + 1;
    });
  }

  private setHiddenComponent() {
    const cell = this.GameCells[this.GameCells.length - 1];
    cell.visibilityClass = Consts.HIDDEN;
    this.moveManager.hiddenComponent = cell;
  }
}

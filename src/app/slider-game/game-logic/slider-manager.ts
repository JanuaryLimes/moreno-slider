import { GameBoardCellComponent } from './../game-board-cell/game-board-cell.component';
import { Observable } from 'rxjs/Observable';
import { Injectable, QueryList } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { GameCell, Consts } from './game-cell';

@Injectable()
export class SliderManager {
  private clickedRow: number;
  private hiddenRow: number;
  private clickedCol: number;
  private hiddenCol: number;
  public GameCellClicked = new Subject<GameCell>();
  public BoardLoaded = new Subject();

  private hiddenComponent: GameBoardCellComponent;
  private clickedComponent: GameBoardCellComponent;

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
    this.clickedComponent = gameCell.component;

    if (!this.isClickValid()) {
      return;
    }

    this.hiddenComponent.visibilityClass = Consts.VISIBLE;
    this.hiddenComponent.dynamiCell.context.num =
      gameCell.component.dynamiCell.context.num;

    gameCell.component.visibilityClass = Consts.HIDDEN;
    this.hiddenComponent = gameCell.component;
  }

  private loaded() {
    console.log('loadedddd');

    this.setNumbers();
    this.hideLastComponent();
  }

  private setNumbers() {
    this.gameCells.forEach((gameBoardCellComponent, index) => {
      gameBoardCellComponent.dynamiCell.context.num = index + 1;
    });
  }

  private hideLastComponent() {
    const cell = this.gameCells[this.gameCells.length - 1];
    this.hiddenComponent = cell;
    cell.visibilityClass = Consts.HIDDEN;
  }

  private isClickValid(): boolean {
    this.clickedRow = this.clickedComponent.rowNumber;
    this.hiddenRow = this.hiddenComponent.rowNumber;
    this.clickedCol = this.clickedComponent.columnNumber;
    this.hiddenCol = this.hiddenComponent.columnNumber;

    if (this.isMoveDown()) {
      return true;
    } else if (this.isMoveUp()) {
      return true;
    } else if (this.isMoveLeft()) {
      return true;
    } else if (this.isMoveRight()) {
      return true;
    } else {
      return false;
    }
  }

  private isMoveDown(): boolean {
    if (
      this.clickedRow + 1 === this.hiddenRow &&
      this.clickedCol === this.hiddenCol
    ) {
      return true;
    }

    return false;
  }

  private isMoveUp(): boolean {
    if (
      this.clickedRow - 1 === this.hiddenRow &&
      this.clickedCol === this.hiddenCol
    ) {
      return true;
    }

    return false;
  }

  private isMoveLeft(): boolean {
    if (
      this.clickedRow === this.hiddenRow &&
      this.clickedCol - 1 === this.hiddenCol
    ) {
      return true;
    }

    return false;
  }

  private isMoveRight(): boolean {
    if (
      this.clickedRow === this.hiddenRow &&
      this.clickedCol + 1 === this.hiddenCol
    ) {
      return true;
    }

    return false;
  }
}

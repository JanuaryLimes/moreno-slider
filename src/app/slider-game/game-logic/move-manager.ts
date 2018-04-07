import { GameCell, Consts } from './game-cell';
import { GameBoardCellComponent } from './../game-board-cell/game-board-cell.component';

export class MoveManager {
  private clickedRow: number;
  private hiddenRow: number;
  private clickedCol: number;
  private hiddenCol: number;

  public hiddenComponent: GameBoardCellComponent;
  public clickedComponent: GameBoardCellComponent;

  public tryClick(component: GameBoardCellComponent): any {
    this.clickedComponent = component;

    if (!this.isClickValid()) {
      return;
    }

    this.hiddenComponent.visibilityClass = Consts.VISIBLE;
    this.hiddenComponent.dynamiCell.context.num =
      component.dynamiCell.context.num;

    component.visibilityClass = Consts.HIDDEN;
    this.hiddenComponent = component;
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

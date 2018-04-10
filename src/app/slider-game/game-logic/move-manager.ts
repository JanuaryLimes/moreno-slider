import { Consts, Moves } from './game-cell';
import { GameBoardCellComponent } from './../game-board-cell/game-board-cell.component';

export class MoveManager {
  private currentMove: Moves;
  private clickedRow: number;
  private hiddenRow: number;
  private clickedCol: number;
  private hiddenCol: number;
  private allMoves: Moves[] = [];

  public hiddenComponent: GameBoardCellComponent;
  public clickedComponent: GameBoardCellComponent;

  public tryClick(component: GameBoardCellComponent): any {
    this.clickedComponent = component;

    if (!this.isClickValid()) {
      return;
    }

    this.allMoves.push(this.currentMove);
    // console.log(`ilosc ruchów: ${this.allMoves.length}`);

    this.hiddenComponent.visibilityClass = Consts.VISIBLE;
    this.hiddenComponent.dynamiCell.context.num =
      component.dynamiCell.context.num;

    this.applyValidAnimation();

    component.visibilityClass = Consts.HIDDEN;
    this.hiddenComponent = component;
  }

  private applyValidAnimation() {
    switch (this.currentMove) {
      case Moves.down:
        this.hiddenComponent.animation_state = Consts.DOWN;
        break;
      case Moves.up:
        this.hiddenComponent.animation_state = Consts.UP;
        break;
      case Moves.left:
        this.hiddenComponent.animation_state = Consts.LEFT;
        break;
      case Moves.right:
        this.hiddenComponent.animation_state = Consts.RIGHT;
        break;
      default:
        break;
    }

    this.hiddenComponent.restoreNormal();
  }

  private isClickValid(): boolean {
    this.clickedRow = this.clickedComponent.rowNumber;
    this.hiddenRow = this.hiddenComponent.rowNumber;
    this.clickedCol = this.clickedComponent.columnNumber;
    this.hiddenCol = this.hiddenComponent.columnNumber;
    this.currentMove = Moves.none;

    if (this.isMoveDown()) {
      this.currentMove = Moves.down;
      return true;
    } else if (this.isMoveUp()) {
      this.currentMove = Moves.up;
      return true;
    } else if (this.isMoveLeft()) {
      this.currentMove = Moves.left;
      return true;
    } else if (this.isMoveRight()) {
      this.currentMove = Moves.right;
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

import { Consts, Moves, Key } from './game-cell';
import { GameBoardCellComponent } from './../game-board-cell/game-board-cell.component';
import { SliderManager } from './slider-manager';

export class MoveManager {
  private mSliderManager: SliderManager;
  private mCurrentMove: Moves;
  private mClickedRow: number;
  private mHiddenRow: number;
  private mClickedCol: number;
  private mHiddenCol: number;
  private mUserMoves: Moves[] = [];
  private mRandomizedMoves: Moves[] = [];

  public HiddenComponent: GameBoardCellComponent;
  public ClickedComponent: GameBoardCellComponent;

  constructor(sliderManager: SliderManager) {
    this.mSliderManager = sliderManager;
  }

  public TryClick(component: GameBoardCellComponent): any {
    if (this.mSliderManager.ClickBlocked()) {
      return;
    }

    if (!component) {
      return;
    }

    this.ClickedComponent = component;
    this.updateClickedRowCol();
    this.updateHiddenRowCol();

    if (!this.isClickValid()) {
      return;
    }

    this.mUserMoves.push(this.mCurrentMove);

    this.HiddenComponent.visibilityClass = Consts.VISIBLE;
    this.HiddenComponent.dynamiCell.context.num =
      component.dynamiCell.context.num;

    this.applyValidAnimation();

    component.visibilityClass = Consts.HIDDEN;
    this.HiddenComponent = component;

    this.mSliderManager.ClickSuccessful();
  }

  public SaveRandomizedMoves() {
    this.mRandomizedMoves = this.mUserMoves;
    this.mUserMoves = [];
  }

  public Clear() {
    this.clearUserMoves();
    this.clearRandomizedMoves();
  }

  private clearUserMoves() {
    this.mUserMoves = [];
  }

  private clearRandomizedMoves() {
    this.mRandomizedMoves = [];
  }

  public RevertUserMoves() {
    const movesCopy = this.mUserMoves.reverse();
    const l = movesCopy.length;

    for (let index = 0; index < l; index++) {
      const element = movesCopy[index];
      this.updateHiddenRowCol();
      this.revertMove(element);
    }

    this.clearUserMoves();
  }

  public SolveBoard() {
    let movesCopy = this.mUserMoves.reverse();
    movesCopy = movesCopy.concat(this.mRandomizedMoves.reverse());
    const l = movesCopy.length;

    for (let index = 0; index < l; index++) {
      const element = movesCopy[index];
      this.revertMove(element);
    }

    this.Clear();
  }

  public MoveFromKeyCode(keyCode: number) {
    if (keyCode === Key.UP || keyCode === Key.W) {
      this.revertMove(Moves.down);
    } else if (keyCode === Key.DOWN || keyCode === Key.S) {
      this.revertMove(Moves.up);
    } else if (keyCode === Key.RIGHT || keyCode === Key.D) {
      this.revertMove(Moves.left);
    } else if (keyCode === Key.LEFT || keyCode === Key.A) {
      this.revertMove(Moves.right);
    } else {
      return;
    }
  }

  private revertMove(move: Moves) {
    this.updateHiddenRowCol();
    let elem;
    switch (move) {
      case Moves.down:
        elem = this.getDownFromHidden();
        break;
      case Moves.up:
        elem = this.getUpFromHidden();
        break;
      case Moves.left:
        elem = this.getLeftFromHidden();
        break;
      case Moves.right:
        elem = this.getRightFromHidden();
        break;
      default:
        break;
    }

    this.TryClick(elem);
  }

  private applyValidAnimation() {
    switch (this.mCurrentMove) {
      case Moves.down:
        this.HiddenComponent.animation_state = Consts.DOWN;
        break;
      case Moves.up:
        this.HiddenComponent.animation_state = Consts.UP;
        break;
      case Moves.left:
        this.HiddenComponent.animation_state = Consts.LEFT;
        break;
      case Moves.right:
        this.HiddenComponent.animation_state = Consts.RIGHT;
        break;
      default:
        break;
    }

    this.HiddenComponent.restoreNormal();
  }

  private updateClickedRowCol() {
    this.mClickedRow = this.ClickedComponent.rowNumber;
    this.mClickedCol = this.ClickedComponent.columnNumber;
  }

  private updateHiddenRowCol() {
    this.mHiddenRow = this.HiddenComponent.rowNumber;
    this.mHiddenCol = this.HiddenComponent.columnNumber;
  }

  private isClickValid(): boolean {
    this.mCurrentMove = Moves.none;

    if (this.isMoveDown()) {
      this.mCurrentMove = Moves.down;
      return true;
    } else if (this.isMoveUp()) {
      this.mCurrentMove = Moves.up;
      return true;
    } else if (this.isMoveLeft()) {
      this.mCurrentMove = Moves.left;
      return true;
    } else if (this.isMoveRight()) {
      this.mCurrentMove = Moves.right;
      return true;
    } else {
      return false;
    }
  }

  private isMoveDown(): boolean {
    if (
      this.mClickedRow + 1 === this.mHiddenRow &&
      this.mClickedCol === this.mHiddenCol
    ) {
      return true;
    }

    return false;
  }

  private isMoveUp(): boolean {
    if (
      this.mClickedRow - 1 === this.mHiddenRow &&
      this.mClickedCol === this.mHiddenCol
    ) {
      return true;
    }

    return false;
  }

  private isMoveLeft(): boolean {
    if (
      this.mClickedRow === this.mHiddenRow &&
      this.mClickedCol - 1 === this.mHiddenCol
    ) {
      return true;
    }

    return false;
  }

  private isMoveRight(): boolean {
    if (
      this.mClickedRow === this.mHiddenRow &&
      this.mClickedCol + 1 === this.mHiddenCol
    ) {
      return true;
    }

    return false;
  }

  public GetAvailableComponentsToMove(): GameBoardCellComponent[] {
    this.updateHiddenRowCol();

    const avMoves: GameBoardCellComponent[] = [];

    const leftFromHidden = this.getLeftFromHidden();
    if (leftFromHidden) {
      avMoves.push(leftFromHidden);
    }

    const right = this.getRightFromHidden();
    if (right) {
      avMoves.push(right);
    }

    const up = this.getUpFromHidden();
    if (up) {
      avMoves.push(up);
    }

    const down = this.getDownFromHidden();
    if (down) {
      avMoves.push(down);
    }

    return avMoves;
  }

  private getLeftFromHidden(): GameBoardCellComponent {
    return this.mSliderManager.GameCells.find(
      item =>
        item.rowNumber === this.mHiddenRow &&
        item.columnNumber === this.mHiddenCol - 1
    );
  }

  private getRightFromHidden(): GameBoardCellComponent {
    return this.mSliderManager.GameCells.find(
      item =>
        item.rowNumber === this.mHiddenRow &&
        item.columnNumber === this.mHiddenCol + 1
    );
  }

  private getUpFromHidden(): GameBoardCellComponent {
    return this.mSliderManager.GameCells.find(
      item =>
        item.rowNumber === this.mHiddenRow - 1 &&
        item.columnNumber === this.mHiddenCol
    );
  }

  private getDownFromHidden(): GameBoardCellComponent {
    return this.mSliderManager.GameCells.find(
      item =>
        item.rowNumber === this.mHiddenRow + 1 &&
        item.columnNumber === this.mHiddenCol
    );
  }
}

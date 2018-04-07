import { GameBoardCellComponent } from './../game-board-cell/game-board-cell.component';

export class GameCell {
  row: number;
  column: number;
  component: GameBoardCellComponent;

  constructor(row: number, column: number, component: GameBoardCellComponent) {
    this.row = row;
    this.column = column;
    this.component = component;
  }
}

export interface IDynamicContext {
  context: DynamicContext;
}

export class DynamicContext {
  num: Number;
}

export class Consts {
  static readonly VISIBLE = ''; // jesli nie ma klasy "chowającej" to element bedzie widoczny
  static readonly HIDDEN = 'visibility-hidden';
}

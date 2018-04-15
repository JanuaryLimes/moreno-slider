import { GameBoardCellComponent } from './../game-board-cell/game-board-cell.component';

export interface IDynamicContext {
  context: DynamicContext;
}

export class DynamicContext {
  num: Number;
}

export class Consts {
  static readonly VISIBLE = ''; // jesli nie ma klasy "chowającej" to element bedzie widoczny
  static readonly HIDDEN = 'visibility-hidden';
  static readonly NORMAL = 'normal';
  static readonly LEFT = 'left';
  static readonly RIGHT = 'right';
  static readonly DOWN = 'down';
  static readonly UP = 'up';
}

export enum Moves {
  none,
  left,
  right,
  down,
  up
}

export enum Key {
  LEFT = 37,
  UP = 38,
  RIGHT = 39,
  DOWN = 40,
  A = 65,
  D = 68,
  S = 83,
  W = 87
}

export class GameCell {
  row: number;
  column: number;

  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
  }
}

export interface IDynamicContext {
  context: DynamicContext;
}

export class DynamicContext {
  num: Number;
}

export class Consts {
  static readonly HIDDEN = 'visibility-hidden';
}

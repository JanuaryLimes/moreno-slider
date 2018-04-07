import { GameBoardCellComponent } from './../game-board-cell/game-board-cell.component';
export class ShuffleManager {
  private gameCells: GameBoardCellComponent[];
  private hiddenComponent: GameBoardCellComponent;

  constructor(gameCells: GameBoardCellComponent[]) {
    this.gameCells = gameCells;
    // this.hiddenComponent = hiddenComponent;

    this.shuffleBoard();
  }

  private shuffleBoard() {}
}

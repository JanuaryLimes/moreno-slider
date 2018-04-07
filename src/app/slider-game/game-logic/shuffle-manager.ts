import { MoveManager } from './move-manager';
import { GameBoardCellComponent } from './../game-board-cell/game-board-cell.component';
import { SliderManager } from './slider-manager';

export class ShuffleManager {
  private sliderManager: SliderManager;
  private moveManager: MoveManager;

  constructor(sliderManager: SliderManager, moveManager: MoveManager) {
    this.sliderManager = sliderManager;
    this.moveManager = moveManager;
  }

  public shuffleBoard() {
    for (let i = 0; i < 1000; i++) {
      this.tryMove();
    }
  }

  private tryMove() {
    const component = this.getComponentToMove();

    if (component) {
      this.moveManager.tryClick(component);
    }
  }

  private getComponentToMove(): GameBoardCellComponent {
    const gameCells = this.sliderManager.GameCells;
    return gameCells[this.getRandomInt(0, gameCells.length - 1)];
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

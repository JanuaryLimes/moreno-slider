import { MoveManager } from './move-manager';
import { GameBoardCellComponent } from './../game-board-cell/game-board-cell.component';
import { SliderManager } from './slider-manager';
import { Consts } from './game-cell';

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

    this.makeLastHiddenAfterShuffle();
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

  private makeLastHiddenAfterShuffle() {
    const gameCells = this.sliderManager.GameCells;
    const lastCell = gameCells[gameCells.length - 1];
    if (lastCell.visibilityClass === Consts.HIDDEN) {
      return;
    }

    const temp = this.moveManager.hiddenComponent;

    this.moveManager.hiddenComponent.visibilityClass = Consts.VISIBLE;
    this.moveManager.hiddenComponent.dynamiCell.context.num =
      lastCell.dynamiCell.context.num;

    lastCell.visibilityClass = Consts.HIDDEN;
    lastCell.dynamiCell.context.num = temp.dynamiCell.context.num;
    this.moveManager.hiddenComponent = lastCell;
  }
}

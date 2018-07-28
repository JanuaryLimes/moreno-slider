import { GameBoardCellComponent } from './../game-board-cell/game-board-cell.component';
import { Injectable, QueryList } from '@angular/core';
import { ShuffleManager } from './shuffle-manager';
import { MoveManager } from './move-manager';
import { Consts } from './game-cell';

@Injectable()
export class SliderManager {
  private shuffleManager: ShuffleManager;
  private moveManager: MoveManager;

  public mStartingInProgress = false;
  public GameStarted = false;
  public SolvingInProgress = false;
  public ResetInProgress = false;

  public GameCells: GameBoardCellComponent[] = new Array();

  constructor() {
    this.moveManager = new MoveManager(this);
    this.shuffleManager = new ShuffleManager(this, this.moveManager);
  }

  // Metoda po wczytaniu komponentów planszy
  public updateGameCells(cells: QueryList<GameBoardCellComponent>): any {
    this.GameCells = new Array<GameBoardCellComponent>();
    cells.forEach(cell => {
      this.GameCells.push(cell);
    });

    this.loaded();
  }

  public clicked(component: GameBoardCellComponent): any {
    this.moveManager.TryClick(component);
  }

  private loaded() {
    console.log('loaded');

    this.setNumbers();
    this.setHiddenComponent();
  }

  private setNumbers() {
    this.GameCells.forEach((gameBoardCellComponent, index) => {
      gameBoardCellComponent.dynamiCell.context.num = index + 1;
      gameBoardCellComponent.visibilityClass = Consts.VISIBLE;
    });
  }

  private setHiddenComponent() {
    const cell = this.GameCells[this.GameCells.length - 1];
    cell.visibilityClass = Consts.HIDDEN;
    this.moveManager.HiddenComponent = cell;
  }

  public newGameClicked() {
    // TODO: zerowanei jakis wynikow itp
    this.GameStarted = true;

    this.mStartingInProgress = true;
    this.loaded();
    this.moveManager.Clear();
    this.shuffleManager.shuffleBoard();
    this.mStartingInProgress = false;
  }

  public reset() {
    this.ResetInProgress = true;
    this.moveManager.RevertUserMoves();
    this.ResetInProgress = false;
  }

  public Solve() {
    this.SolvingInProgress = true;
    this.moveManager.SolveBoard();
    this.SolvingInProgress = false;

    this.GameStarted = false;
  }

  public KeyUp(keyCode: number) {
    this.moveManager.MoveFromKeyCode(keyCode);
  }

  public ClickBlocked(): boolean {
    if (this.GameStarted === false) {
      return true;
    }

    return false;
  }

  public ClickSuccessful() {
    if (
      this.ResetInProgress ||
      this.SolvingInProgress ||
      this.mStartingInProgress
    ) {
      return;
    }

    if (this.gameIsSolved()) {
      this.GameStarted = false;

      setTimeout(() => {
        // czekamy na skonczenie animacji
        alert('Wygrałeś!');
      }, 350);
    }
  }

  private gameIsSolved(): boolean {
    let isSolved = true;

    this.GameCells.forEach((gameBoardCellComponent, index) => {
      if (index > 0 && index < 15) {
        if (gameBoardCellComponent.dynamiCell.context.num !== index + 1) {
          isSolved = false;
        }
      }
    });

    return isSolved;
  }
}

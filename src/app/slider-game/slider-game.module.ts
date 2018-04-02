import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameBoardCellComponent } from './game-board-cell/game-board-cell.component';
import { SliderManager } from './game-logic/slider-manager';

@NgModule({
  imports: [CommonModule],
  declarations: [GameComponent, GameBoardComponent, GameBoardCellComponent],
  exports: [GameComponent],
  providers: [SliderManager]
})
export class SliderGameModule {}

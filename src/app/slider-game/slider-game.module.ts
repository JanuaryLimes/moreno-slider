import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { GameBoardComponent } from './game-board/game-board.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GameComponent, GameBoardComponent
  ],
  exports: [
    GameComponent
  ]
})
export class SliderGameModule { }

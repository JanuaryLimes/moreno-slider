import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameBoardCellComponent } from './game-board-cell/game-board-cell.component';
import { SliderManager } from './game-logic/slider-manager';
import { DynamicCellComponent } from './dynamic-cell/dynamic-cell.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [CommonModule, BrowserModule, BrowserAnimationsModule],
  declarations: [
    GameComponent,
    GameBoardComponent,
    GameBoardCellComponent,
    DynamicCellComponent
  ],
  exports: [GameComponent],
  providers: [SliderManager]
})
export class SliderGameModule {}

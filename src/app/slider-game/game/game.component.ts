import { GameBoardCellComponent } from './../game-board-cell/game-board-cell.component';
import { SliderManager } from './../game-logic/slider-manager';
import {
  Component,
  OnInit,
  OnDestroy,
  ComponentFactoryResolver,
  Injector,
  ComponentRef,
  EmbeddedViewRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GameCell, Consts } from '../game-logic/game-cell';

@Component({
  selector: 'slider-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
  s2: Subscription;
  subscription: Subscription;

  constructor(
    private sliderManager: SliderManager,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  ngOnInit() {
    this.subscription = this.sliderManager.GameCellClicked.subscribe(
      gameCell => {
        console.log(
          `from subscription... row: ${(gameCell as GameCell).row}, col: ${
            (gameCell as GameCell).column
          }`
        );
      }
    );
    this.s2 = this.sliderManager.BoardLoaded.subscribe(() => {
      this.loaded();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.s2.unsubscribe();
  }

  loaded() {
    console.log('loadedddd');

    this.sliderManager.gameCells.forEach((gameBoardCellComponent, index) => {
      gameBoardCellComponent.dynamiCell.context.num = index + 1;
    });

    const cell = this.sliderManager.gameCells[
      this.sliderManager.gameCells.length - 1
    ];
    cell.visibilityClass = Consts.HIDDEN;
  }
}

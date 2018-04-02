import { SliderManager } from './../game-logic/slider-manager';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GameCell } from '../game-logic/game-cell';

@Component({
  selector: 'slider-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(private sliderManager: SliderManager) {}

  ngOnInit() {
    this.subscription = this.sliderManager.GameCellSubject.subscribe(
      gameCell => {
        console.log(
          `from subscription... row: ${(gameCell as GameCell).row}, col: ${
            (gameCell as GameCell).column
          }`
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

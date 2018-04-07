import { GameBoardCellComponent } from './../game-board-cell/game-board-cell.component';
import { SliderManager } from './../game-logic/slider-manager';
import {
  Component,
  OnInit,
  OnDestroy,
  ComponentFactoryResolver,
  Injector,
  ComponentRef,
  EmbeddedViewRef,
  AfterViewInit
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GameCell, Consts } from '../game-logic/game-cell';

@Component({
  selector: 'slider-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy, AfterViewInit {
  s2: Subscription;
  subscription: Subscription;

  constructor(private sliderManager: SliderManager) {}

  ngOnInit() {
    const that = this;
    this.subscription = this.sliderManager.GameCellClicked.subscribe(
      gameCell => {
        that.sliderManager.clicked(gameCell);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.s2.unsubscribe();
  }

  ngAfterViewInit(): void {
    Promise.resolve(null).then(() => {
      this.sliderManager.BoardLoaded.next();
    });
  }
}

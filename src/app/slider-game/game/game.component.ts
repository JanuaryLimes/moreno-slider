import { SliderManager } from './../game-logic/slider-manager';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Consts } from '../game-logic/game-cell';

@Component({
  selector: 'slider-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit {
  constructor(private sliderManager: SliderManager) {}

  ngOnInit() {}

  shuffleClicked() {
    this.sliderManager.shuffleClicked();
  }

  ngAfterViewInit(): void {
    Promise.resolve(null).then(() => {
      this.sliderManager.BoardLoaded.next();
    });
  }
}

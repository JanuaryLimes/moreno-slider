import { SliderManager } from './../game-logic/slider-manager';
import { Component, OnInit, HostListener } from '@angular/core';
import { Consts } from '../game-logic/game-cell';

@Component({
  selector: 'slider-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  constructor(private sliderManager: SliderManager) {}

  ngOnInit() {}

  private newClicked() {
    this.sliderManager.newGameClicked();
    console.log('new');
  }

  private resetClicked() {
    this.sliderManager.reset();
    console.log('reset');
  }

  private solveClicked() {
    this.sliderManager.Solve();
    console.log('solve');
  }

  @HostListener('window:keyup', ['$event'])
  onKeyup(event: KeyboardEvent) {
    // console.log('keyup..', event);
    this.sliderManager.KeyUp(event.keyCode);
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
    }
  }
}

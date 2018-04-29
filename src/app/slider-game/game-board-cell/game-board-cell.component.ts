import { Consts } from './../game-logic/game-cell';
import { DynamicCellComponent } from './../dynamic-cell/dynamic-cell.component';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { SliderManager } from '../game-logic/slider-manager';
import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
  query,
  stagger,
  state
} from '@angular/animations';

@Component({
  selector: 'slider-game-board-cell',
  templateUrl: './game-board-cell.component.html',
  styleUrls: ['./game-board-cell.component.css'],
  animations: [
    trigger('cellState', [
      state('normal', style({ transform: 'translateX(0) translateY(0)' })),
      state('left', style({ transform: 'translateX(100%) translateY(0)' })),
      state('right', style({ transform: 'translateX(-100%) translateY(0)' })),
      state('down', style({ transform: 'translateX(0) translateY(-100%)' })),
      state('up', style({ transform: 'translateX(0) translateY(100%)' })),
      transition('normal => *', animate(0)),
      transition('* => normal', animate('300ms ease-out'))
    ])
  ]
})
export class GameBoardCellComponent implements OnInit {
  @Input() rowNumber: number;
  @Input() columnNumber: number;

  public visibilityClass: string;
  public animation_state = 'normal';

  @ViewChild(DynamicCellComponent) dynamiCell: DynamicCellComponent;

  constructor(private sliderManager: SliderManager, public elem: ElementRef) { }

  ngOnInit() { }

  public onClick() {
    this.sliderManager.clicked(this);
  }

  public restoreNormal() {
    setTimeout(() => {
      this.animation_state = Consts.NORMAL;
    }, 5);
  }
}

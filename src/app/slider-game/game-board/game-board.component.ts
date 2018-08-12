import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  AfterViewInit
} from '@angular/core';
import { GameBoardCellComponent } from '../game-board-cell/game-board-cell.component';
import { SliderManager } from '../game-logic/slider-manager';
import { Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'slider-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit, AfterViewInit {
  @ViewChildren(GameBoardCellComponent)
  cells: QueryList<GameBoardCellComponent>;

  private rowCount = 4;
  private columnCount = 4;

  rows = [].constructor(this.rowCount);
  columns = [].constructor(this.columnCount);

  constructor(
    private sliderManager: SliderManager,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.sliderManager.updateGameCells(this.cells);
    this.cdRef.detectChanges();
  }
}

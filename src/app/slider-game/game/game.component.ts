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
import { GameCell } from '../game-logic/game-cell';

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
      // this.loaded();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.s2.unsubscribe();
  }

  loaded() {
    console.log('loadedddd');

    this.sliderManager.gameCells.forEach((div, index) => {
      // div.innerHTML = index;
      // div.innerHTML = index.toString();
      // div.appendChild(this.CreateComponent(TileComponent, index));
    });
  }

  CreateComponent(component: any, index: number): any {
    // (component as TileComponent).num = index;

    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    return domElem;
  }
}

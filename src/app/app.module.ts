import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SliderGameModule } from './slider-game/slider-game.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, SliderGameModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

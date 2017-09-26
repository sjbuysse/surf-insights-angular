import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDGSHuPT1qHuj_3CsFkT5UREkbav2HET-g'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

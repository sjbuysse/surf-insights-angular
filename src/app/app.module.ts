import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';
import { FilterDrawerComponent } from './filter-drawer/filter-drawer.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterDrawerComponent
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

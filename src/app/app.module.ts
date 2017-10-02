import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';
import {AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { SurfspotService} from './surfspots/surfspot.service';

import { FilterDrawerComponent } from './filter-drawer/filter-drawer.component';
import { SurfspotComponent } from './surfspots/surfspot.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterDrawerComponent,
    SurfspotComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDGSHuPT1qHuj_3CsFkT5UREkbav2HET-g'
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database
    AngularFireAuthModule, // imports firebase/auth
  ],
  providers: [
    SurfspotService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

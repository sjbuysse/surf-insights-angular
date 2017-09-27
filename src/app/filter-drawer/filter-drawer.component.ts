import { Component, OnInit } from '@angular/core';
import {SurfspotService} from '../surfspots/surfspot.service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'si-filter-drawer',
  templateUrl: './filter-drawer.component.html',
  styleUrls: ['./filter-drawer.component.scss']
})
export class FilterDrawerComponent implements OnInit {
  surfspots: FirebaseListObservable<any>;

  constructor(private _service: SurfspotService) { }

  ngOnInit() {
    this.surfspots = this._service.fetchSurfspots();
    console.log("init");
  }

}

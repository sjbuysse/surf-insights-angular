import { Component, OnInit } from '@angular/core';
import {SurfspotService} from '../surfspots/surfspot.service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'si-filter-drawer',
  templateUrl: './filter-drawer.component.html',
  styleUrls: ['./filter-drawer.component.scss']
})
export class FilterDrawerComponent implements OnInit {
  surfspots: FirebaseObjectObservable<any>;
  surfspotList: FirebaseListObservable<any>;
  showDrawer: boolean;

  constructor(private _service: SurfspotService) {
    this.showDrawer = false;
  }

  toggleDrawer(): void {
    this.showDrawer = !this.showDrawer;
  }

  ngOnInit() {
    // this.surfspots = this._service.fetchSurfspots();
    this.surfspotList = this._service.fetchSurfspotList();
    this.surfspotList.subscribe(user => console.log(user));
  }

}

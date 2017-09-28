import { Component, OnInit } from '@angular/core';
import {SurfspotService} from '../surfspots/surfspot.service';
import {Observable} from 'rxjs/Observable';
import {Surfspot} from '../surfspots/Surfspot';
import {StateService} from '../state.service';

@Component({
  selector: 'si-filter-drawer',
  templateUrl: './filter-drawer.component.html',
  styleUrls: ['./filter-drawer.component.scss']
})
export class FilterDrawerComponent implements OnInit {
  surfspotList: Observable<Surfspot[]>;
  showDrawer: boolean;

  constructor(private _dataService: SurfspotService, private _stateService: StateService) {
    this.showDrawer = false;
  }

  toggleDrawer(): void {
    this.showDrawer = !this.showDrawer;
  }

  setActiveSurfspot(surfspot: Surfspot): void {
    this._stateService.setActiveSurfspot(surfspot);
  }

  ngOnInit() {
    this.surfspotList = this._dataService.fetchSurfspotList();
  }

}

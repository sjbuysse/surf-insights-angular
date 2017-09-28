import { Component, OnInit } from '@angular/core';
import {SurfspotService} from '../surfspots/surfspot.service';
import {Observable} from 'rxjs/Observable';
import {Surfspot} from '../surfspots/Surfspot';

@Component({
  selector: 'si-filter-drawer',
  templateUrl: './filter-drawer.component.html',
  styleUrls: ['./filter-drawer.component.scss']
})
export class FilterDrawerComponent implements OnInit {
  surfspotList: Observable<Surfspot[]>;
  showDrawer: boolean;

  constructor(private _service: SurfspotService) {
    this.showDrawer = false;
  }

  toggleDrawer(): void {
    this.showDrawer = !this.showDrawer;
  }

  ngOnInit() {
    this.surfspotList = this._service.fetchSurfspotList();
  }

}

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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

  @Output()
  onSurfspotSelection: EventEmitter<any> = new EventEmitter();


  constructor(private _dataService: SurfspotService) {
    this.showDrawer = false;
  }

  toggleDrawer(): void {
    this.showDrawer = !this.showDrawer;
  }

  setActiveSurfspot(spot: Surfspot): void {
    this.onSurfspotSelection.emit({spot});
  }

  ngOnInit() {
    this.surfspotList = this._dataService.fetchSurfspotList();
  }

}

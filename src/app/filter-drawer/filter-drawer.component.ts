import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Surfspot} from '../surfspots/Surfspot';

@Component({
  selector: 'si-filter-drawer',
  templateUrl: './filter-drawer.component.html',
  styleUrls: ['./filter-drawer.component.scss']
})
export class FilterDrawerComponent implements OnInit {
  @Input()
  showDrawer: boolean;

  @Input()
  surfspotList: Observable<Surfspot[]>;
  @Output()
  onSurfspotSelection: EventEmitter<any> = new EventEmitter();
  @Output()
  onToggleDrawer: EventEmitter<any> = new EventEmitter();


  constructor() {
    this.showDrawer = false;
  }

  toggleDrawer(): void {
    this.onToggleDrawer.emit();
  }

  setActiveSurfspotAndImageList(spot: Surfspot): void {
    this.onSurfspotSelection.emit({spot});
  }

  ngOnInit() {
  }

}

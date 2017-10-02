import {Component, Input, OnInit} from '@angular/core';
import {Surfspot} from './surfspots/Surfspot';
import {SurfspotService} from './surfspots/surfspot.service';
import {Observable} from 'rxjs/Observable';
import {ImageDetails} from './surfspots/ImageDetails';

@Component({
  selector: 'si-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  lat: number = 51.678418;
  lng: number = 7.809007;

  surfspotList: Observable<Surfspot[]>;
  activeSurfspot: Surfspot;
  activeSurfspotBackup: Surfspot;
  activeSurfspotImageList: ImageDetails[];
  activeSurfspotImageListBackup: ImageDetails[];

  constructor(private _dataService: SurfspotService){
  }

  setActiveSurfspotAndImageList($event): void {
    this.activeSurfspot = $event.spot;
    this._dataService.fetchImageList($event.spot)
      .then(imageList =>  this.activeSurfspotImageList = imageList);
  }

  setEditing($event): void {
    this.activeSurfspot.editing = $event;
    this.setBackups();
  }

  cancelEditing(): void {
    this.rollbackBackups();
    this.resetBackupsAndEditingVar();
  }

  update(): void {
    this.resetBackupsAndEditingVar();
    this._dataService.updateSurfspot(this.activeSurfspot);
    this._dataService.updateImageList(this.activeSurfspot, this.activeSurfspotImageList);
  }

  private rollbackBackups() {
    this.activeSurfspotImageList = JSON.parse(JSON.stringify(this.activeSurfspotImageListBackup));
    this.activeSurfspot = Object.assign({}, this.activeSurfspotBackup);
  }

  private setBackups() {
    this.activeSurfspotBackup = Object.assign({}, this.activeSurfspot);
    this.activeSurfspotImageListBackup = JSON.parse(JSON.stringify(this.activeSurfspotImageList));
  }

  private resetBackupsAndEditingVar() {
    this.activeSurfspot.editing = false;
    this.activeSurfspotBackup = null;
    this.activeSurfspotImageListBackup = null;
  }

  ngOnInit(): void {
    this.surfspotList = this._dataService.fetchSurfspotList();
  }
}

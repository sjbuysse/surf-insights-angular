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
  activeSurfspotImageList: Observable<ImageDetails[]>;
  activeSurfspotImageListBackup: ImageDetails[];

  constructor(private _dataService: SurfspotService) {
  }

  setActiveSurfspotAndImageList($event): void {
    this.activeSurfspot = $event.spot;
    this.activeSurfspotImageList = this._dataService.fetchImageList(this.activeSurfspot);
  }

  setEditing($event): void {
    this.activeSurfspot.editing = $event;
    this.setBackups();
  }

  cancelEditing(): void {
    this.rollbackBackups();
    this.resetBackupsAndEditingVar();
  }

  deleteImage(image: ImageDetails): void {
    this.removeSingleImage(image);
  }

  update(): void {
    this.resetBackupsAndEditingVar();
    this._dataService.updateSurfspot(this.activeSurfspot);
    // this._dataService.updateImageList(this.activeSurfspot, this.activeSurfspotImageList);
  }

  private rollbackBackups(): void {
    for (const key of Object.keys(this.activeSurfspotBackup)) {
      this.activeSurfspot[key] = this.activeSurfspotBackup[key];
    }
    // set imagelist to backup through dataservice
    // this._dataService.updateImageList(this.activeSurfspot, this.activeSurfspotImageListBackup);
  }

  private setBackups() {
    this.activeSurfspotBackup = Object.assign({}, this.activeSurfspot);
    // this.activeSurfspotImageListBackup = JSON.parse(JSON.stringify(this.activeSurfspotImageList));
    this.activeSurfspotImageList
      .first()
      .toPromise()
      .then(list => this.activeSurfspotImageListBackup = list);
  }

  private resetBackupsAndEditingVar() {
    this.activeSurfspot.editing = false;
    this.activeSurfspotBackup = null;
    this.activeSurfspotImageListBackup = null;
  }

  ngOnInit(): void {
    this.surfspotList = this._dataService.fetchSurfspotList();
  }

  private removeSingleImage(image: ImageDetails) {
    // remove image from storage
    this._dataService.removeImageStorage(image);
    // remove imageDetails from database
    this._dataService.removeImageDetails(this.activeSurfspot, image);
  }
}

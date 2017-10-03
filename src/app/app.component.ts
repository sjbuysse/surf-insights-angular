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
  // SurfComponent variables
  surfspotList: Observable<Surfspot[]>;
  activeSurfspot: Surfspot;
  activeSurfspotImageList: Observable<ImageDetails[]>;
  surfspotFormValues: Surfspot;
  imageListFormValues: ImageDetails[];
  showPopup: boolean;
  showDrawer: boolean;

  constructor(private _dataService: SurfspotService) {
    this.showPopup = false;
    this.showDrawer = false;
  }

  togglePopup(): void {
    this.showPopup = !this.showPopup;
  }

  toggleDrawer(): void {
    this.showDrawer = !this.showDrawer;
  }

  setSurfComponentVariables($event): void {
    // set activeSurfspot
    this.activeSurfspot = $event.spot;
    // set activeSurfspotImageList
    this.activeSurfspotImageList = this._dataService.fetchImageList($event.spot);
    this.resetSurfComponentFormValues();
    this.toggleDrawer();
  }

  setEditing(editing): void {
    this.activeSurfspot.editing = editing;
  }

  cancelEditing(): void {
    this.activeSurfspot.editing = false;
    this.resetSurfComponentFormValues();
  }

  deleteImage(image: ImageDetails): void {
    this.removeSingleImage(image);
  }

  update($event): void {
    this.updateSurfspotValues($event.surfspotValues);
    this.activeSurfspot.editing = false;
    this._dataService.updateSurfspot(this.activeSurfspot);
    this._dataService.updateImageList(this.activeSurfspot, $event.imageListValues);
  }

  private updateSurfspotValues(formValues) {
    for (const key of Object.keys(formValues)){
      this.activeSurfspot[key] = formValues[key];
    }
  }

  private resetSurfComponentFormValues() {
    // set surfspotFormValues
    this.surfspotFormValues = Object.assign({}, this.activeSurfspot);
    // set ImageListFormValues
    this.activeSurfspotImageList
      .first()
      .toPromise()
      .then(response => this.imageListFormValues = response);
  }

  private removeSingleImage(image: ImageDetails) {
    // remove image from storage
    this._dataService.removeImageStorage(image);
    // remove imageDetails from database
    this._dataService.removeImageDetails(this.activeSurfspot, image);
  }

  ngOnInit(): void {
    this.surfspotList = this._dataService.fetchSurfspotList();
  }
}

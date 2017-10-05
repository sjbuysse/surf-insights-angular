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
  surfspotFormValues: Surfspot;
  showPopup: boolean;
  showDrawer: boolean;

  // ImageGalleryComponent variables
  activeSurfspotImageList: Observable<ImageDetails[]>;
  imageListFormValues: ImageDetails[];
  imagePreview: object;
  resizedImage: object;

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

  handleImageSelection($event): void {
    const selectedFile = $event.target.files[0];
    this.resizedImage = null;
    if (this.extensionAllowed(selectedFile.name)) {
      // preview images, show upload button, and start resizing image for upload
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imagePreview = event.target.result;
        // reset resized image if still present from last time
        if (this.resizedImage) {
          this.resizedImage = null;
        }
        // start resizing the image as soon as it is selected
        // imageResizer.resizeImage(event.target, (result) => this.resizedImage = result);
      };
      // Read in the image file as a data URL.
      reader.readAsDataURL(selectedFile);
    } else {
      alert('The file extension is not allowed.\n' +
        'Please try again with a jpg, jpeg, png or bmp file.');
      // this.resetUploadVariables();
      return;
    }
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

  private extensionAllowed(filename): boolean {
    let isAllowed: boolean;
    // check if selected file extension is allowed
    const ext = filename.match(/\.([^\.]+)$/)[1];
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'bmp':
        isAllowed = true;
        break;
      default:
        isAllowed = false;
        break;
    }
    return isAllowed;
  }

  ngOnInit(): void {
    this.surfspotList = this._dataService.fetchSurfspotList();
  }
}

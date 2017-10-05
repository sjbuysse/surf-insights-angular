import {Component, Input, OnInit} from '@angular/core';
import {Surfspot} from './surfspots/Surfspot';
import {SurfspotService} from './surfspots/surfspot.service';
import {Observable} from 'rxjs/Observable';
import {ImageDetails} from './surfspots/ImageDetails';
import {ImageResizerService} from './image-resizer.service';

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
  previewImage: object;
  previewImageCaption: string;
  resizedImage: object;
  uploadProgress: number;

  selectedFile: any;

  constructor(private _dataService: SurfspotService, private _imageResizerService: ImageResizerService) {
    this.previewImageCaption = '';
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
    this.selectedFile = $event.target.files[0];
    this.resizedImage = null;

    if (this.extensionAllowed(this.selectedFile.name)) {
      this.readSelectedFile(this.selectedFile)
        .then((result) => {
          this.previewImage = result;
          this.resizeImage(result).then((resizedImage) => this.resizedImage = resizedImage);
        });
    } else {
      alert('The file extension is not allowed.\n' +
        'Please try again with a jpg, jpeg, png or bmp file.');
      this.resetUploadVariables();
      return;
    }
  }

  handleChangePreviewCaption($event): void {
    console.log($event);
    this.previewImageCaption = $event;
  }

  handleImageUpload(): void {
    const self = this;
    const uploadTask = this._dataService.uploadImage(this.activeSurfspot, this.resizedImage, this.selectedFile.name);
    // // Register three observers:
    // // 1. 'state_changed' observer, called any time the state changes
    // // 2. Error observer, called on failure
    // // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', self.setUploadProgress, self.handleUploadError,
      function(){
        self._dataService.uploadImageMetaData(uploadTask, self.activeSurfspot, self.previewImageCaption, self.selectedFile.name);
      });
    // upload imageDetails naar de firebase database
  }

  private handleUploadError(error) {
    // Handle unsuccessful uploads
    console.log('There occured an error while uploading the file to the server :' );
    console.log(error);
    this.resetUploadVariables();
  }

  private resetUploadVariables() {
    // todo: implement
  }

  private setUploadProgress(snapshot) {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + this.uploadProgress + '% done');
    // switch (snapshot.state) {
    //   case firebase.storage.TaskState.PAUSED: // or 'paused'
    //     console.log('Upload is paused');
    //     break;
    //   case firebase.storage.TaskState.RUNNING: // or 'running'
    //     console.log('Upload is running');
    //     break;
    // }
  }

  private resizeImage(image): Promise<object> {
    // reset resized image if still present from last time
    if (this.resizedImage) {
      this.resizedImage = null;
    }
    // start resizing the image as soon as it is selected
    return this._imageResizerService.resizeImage(image);
  }

  private readSelectedFile(selectedFile): Promise<object> {
    // preview images, show upload button, and start resizing image for upload
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        resolve(event.target.result);
      };
      // Read in the image file as a data URL.
      reader.readAsDataURL(selectedFile);
    });
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

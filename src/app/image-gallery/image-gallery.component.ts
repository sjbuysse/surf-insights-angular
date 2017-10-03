import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Surfspot} from '../surfspots/Surfspot';
import {Observable} from 'rxjs/Observable';
import {ImageDetails} from '../surfspots/ImageDetails';
import {WindowRefService} from '../window-ref.service';

@Component({
  selector: 'si-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {
  private _window: Window;

  @Input()
  activeSurfspot: Surfspot;
  @Input()
  activeSurfspotImageList: Observable<ImageDetails[]>;
  @Input()
  imageListFormValues: ImageDetails[];
  @Input()
  surfspotFormValues: Surfspot;

  @Output()
  onSetEditing: EventEmitter<boolean> = new EventEmitter();
  @Output()
  onCancelEditing: EventEmitter<any> = new EventEmitter();
  @Output()
  onUpdate: EventEmitter<any> = new EventEmitter();
  @Output()
  onDeleteImage: EventEmitter<any> = new EventEmitter();
  @Output()
  onImageSelection: EventEmitter<any> = new EventEmitter();

  constructor(_windowRefService: WindowRefService) {
    this._window = _windowRefService.nativeWindow;
  }

  setEditing(editing: boolean): void {
    this.onSetEditing.emit(editing);
  }

  cancelEditing(): void {
    this.onCancelEditing.emit();
  }

  update(): void {
    this.onUpdate.emit({surfspotValues: this.surfspotFormValues, imageListValues: this.imageListFormValues});
  }

  deleteImage(image: ImageDetails): void {
    if (confirm('Are you sure you want to permanently delete this image?')) {
      this.onDeleteImage.emit(image);
    }
  }

  handleImageSelection($event): void {
    console.log($event);
  }

  // return true if browser supports the File API
  supportFileAPI = function(){
    if (this._window.File && this._window.FileReader && this._window.FileList && this._window.Blob) {
      return true;
    } else {
      return false;
    }
  };

  ngOnInit() {
  }

}

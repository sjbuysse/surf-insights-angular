import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Surfspot} from './Surfspot';
import {ImageDetails} from './ImageDetails';
import {Observable} from 'rxjs/Observable';
import {WindowRefService} from '../window-ref.service';

@Component({
  selector: 'si-surfspot',
  templateUrl: './surfspot.component.html',
  styleUrls: ['./surfspot.component.scss']
})
export class SurfspotComponent implements OnInit {
  private _window: Window;

  @Input()
  activeSurfspot: Surfspot;
  @Input()
  activeSurfspotImageList: Observable<ImageDetails[]>;
  @Input()
  surfspotFormValues: Surfspot;
  @Input()
  imageListFormValues: ImageDetails[];
  @Input()
  showPopup: boolean;


  @Output()
  onSetEditing: EventEmitter<boolean> = new EventEmitter();
  @Output()
  onCancelEditing: EventEmitter<any> = new EventEmitter();
  @Output()
  onUpdate: EventEmitter<any> = new EventEmitter();
  @Output()
  onDeleteImage: EventEmitter<any> = new EventEmitter();
  @Output()
  onTogglePopup: EventEmitter<any> = new EventEmitter();
  @Output()
  onImageSelection: EventEmitter<any> = new EventEmitter();

  constructor(_windowRefService: WindowRefService) {
    this._window = _windowRefService.nativeWindow;
    this.showPopup = false;
  }

  togglePopup(): void {
    this.onTogglePopup.emit();
  }

  setEditing(editing: boolean): void {
    this.onSetEditing.emit(editing);
  }

  cancelEditing(): void {
    this.onCancelEditing.emit();
  }

  handleImageSelection($event): void {
    console.log($event);
  }

  update(): void {
    this.onUpdate.emit({surfspotValues: this.surfspotFormValues, imageListValues: this.imageListFormValues});
  }

  deleteImage(image: ImageDetails): void {
    if (confirm('Are you sure you want to permanently delete this image?')) {
      this.onDeleteImage.emit(image);
    }
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

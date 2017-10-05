import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Surfspot} from '../surfspots/Surfspot';
import {WindowRefService} from '../window-ref.service';

@Component({
  selector: 'si-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnChanges {
  private _window;
  barWidth: number;
  @Input() uploadProgress: number;
  @Input() activeSurfspot: Surfspot;
  @Input() previewImage: object;
  @Input() previewImageCaption: string;

  @Output() onImageSelection: EventEmitter<any> = new EventEmitter();
  @Output() onImageUpload: EventEmitter<any> = new EventEmitter();
  @Output() onChangePreviewCaption: EventEmitter<any> = new EventEmitter();

  constructor(_windowRefService: WindowRefService) {
    this._window = _windowRefService.nativeWindow;
  }


  handleImageSelection($event): void {
    this.onImageSelection.emit($event);
  }

  handleImageUpload(): void {
    this.onImageUpload.emit();
  }

  handleChangePreviewCaption($event): void {
    console.log($event);
    this.onChangePreviewCaption.emit($event);
  }

  // return true if browser supports the File API
  supportFileAPI = function(){
    if (this._window.File && this._window.FileReader && this._window.FileList && this._window.Blob) {
      return true;
    } else {
      return false;
    }
  };

  ngOnChanges(): void {
    // we calculate the width based on a progressbar that is maximum 200px wide
    this.barWidth = Math.floor(this.uploadProgress / 100.0 * 200);
  }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Surfspot} from './Surfspot';
import {ImageDetails} from './ImageDetails';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'si-surfspot',
  templateUrl: './surfspot.component.html',
  styleUrls: ['./surfspot.component.scss']
})
export class SurfspotComponent implements OnInit {
  @Input() activeSurfspot: Surfspot;
  @Input() activeSurfspotImageList: Observable<ImageDetails[]>;
  @Input() surfspotFormValues: Surfspot;
  @Input() imageListFormValues: ImageDetails[];
  @Input() showPopup: boolean;
  @Input() previewImage: object;
  @Input() previewImageCaption: string;
  @Input() uploadProgress: number;


  @Output() onSetEditing: EventEmitter<boolean> = new EventEmitter();
  @Output() onCancelEditing: EventEmitter<any> = new EventEmitter();
  @Output() onUpdate: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteImage: EventEmitter<any> = new EventEmitter();
  @Output() onTogglePopup: EventEmitter<any> = new EventEmitter();
  @Output() onImageSelection: EventEmitter<any> = new EventEmitter();
  @Output() onImageUpload: EventEmitter<any> = new EventEmitter();
  @Output() onChangePreviewCaption: EventEmitter<any> = new EventEmitter();

  constructor() {
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

  deleteImage(image: ImageDetails): void {
    this.onDeleteImage.emit(image);
  }

  handleImageSelection($event): void {
    this.onImageSelection.emit($event);
  }

  handleImageUpload(): void {
    this.onImageUpload.emit();
  }

  handleChangePreviewCaption($event): void {
    this.onChangePreviewCaption.emit($event);
  }

  update(): void {
    this.onUpdate.emit({surfspotValues: this.surfspotFormValues, imageListValues: this.imageListFormValues});
  }

  ngOnInit() {
  }
}

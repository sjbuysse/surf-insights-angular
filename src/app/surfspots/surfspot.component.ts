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

  update(): void {
    this.onUpdate.emit({surfspotValues: this.surfspotFormValues, imageListValues: this.imageListFormValues});
  }

  deleteImage(image: ImageDetails): void {
    if (confirm('Are you sure you want to permanently delete this image?')) {
      this.onDeleteImage.emit(image);
    }
  }

  private setSurfFormValues(surfspot: Surfspot) {
    this.surfspotFormValues = Object.assign({}, this.activeSurfspot);
    console.log(this.surfspotFormValues);
  }

  private setImageListFormValues(imageList: Observable<ImageDetails[]>) {
    this.activeSurfspotImageList
      .first()
      .toPromise()
      .then(response => this.imageListFormValues = response);
  }

  ngOnInit() {
  }
}

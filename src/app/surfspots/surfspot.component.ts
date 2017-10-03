import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Surfspot} from './Surfspot';
import {ImageDetails} from './ImageDetails';
import {ConfirmationService} from 'primeng/primeng';

@Component({
  selector: 'si-surfspot',
  templateUrl: './surfspot.component.html',
  styleUrls: ['./surfspot.component.scss']
})
export class SurfspotComponent implements OnInit {
  showPopup: boolean;

  @Input()
  activeSurfspot: Surfspot;
  @Input()
  activeSurfspotImageList: ImageDetails[];

  @Output()
  onSetEditing: EventEmitter<boolean> = new EventEmitter();
  @Output()
  onCancelEditing: EventEmitter<any> = new EventEmitter();
  @Output()
  onUpdate: EventEmitter<any> = new EventEmitter();
  @Output()
  onDeleteImage: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.showPopup = false;
  }

  togglePopup(): void {
    this.showPopup = !this.showPopup;
  }

  setEditing(editing: boolean) {
    this.onSetEditing.emit(editing);
  }

  cancelEditing() {
    this.onCancelEditing.emit();
  }

  update() {
    this.onUpdate.emit();
  }

  deleteImage(image: ImageDetails) {
    if(confirm('Are you sure you want to permanently delete this image?')) {
      this.onDeleteImage.emit(image);
    }
  }

  ngOnInit() {
  }
}

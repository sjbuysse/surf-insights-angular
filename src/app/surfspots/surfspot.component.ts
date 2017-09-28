import {Component, Input, OnInit} from '@angular/core';
import {Surfspot} from './Surfspot';

@Component({
  selector: 'si-surfspot',
  templateUrl: './surfspot.component.html',
  styleUrls: ['./surfspot.component.scss']
})
export class SurfspotComponent implements OnInit {
  showPopup: boolean;
  @Input()
  activeSurfspot: Surfspot;

  constructor() {
    this.showPopup = false;
  }

  togglePopup(): void {
    this.showPopup = !this.showPopup;
  }

  ngOnInit() {
  }

}

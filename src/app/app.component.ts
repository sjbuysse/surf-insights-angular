import {Component, Input} from '@angular/core';

@Component({
  selector: 'si-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lat: number = 51.678418;
  lng: number = 7.809007;

  @Input()
  selectedSpot;
}

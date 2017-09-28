import { Component, OnInit } from '@angular/core';
import {SurfspotService} from '../surfspots/surfspot.service';
import { FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'si-surfspot',
  templateUrl: './surfspot.component.html',
  styleUrls: ['./surfspot.component.scss']
})
export class SurfspotComponent implements OnInit {

  constructor(private _service: SurfspotService) {
  }

  ngOnInit() {
  }

}

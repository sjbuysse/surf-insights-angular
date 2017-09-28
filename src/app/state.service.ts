import { Injectable } from '@angular/core';
import {Surfspot} from './surfspots/Surfspot';

@Injectable()
export class StateService {
  activeSurfspot: Surfspot;

  constructor() { }

  setActiveSurfspot(activeSurfspot: Surfspot): void {
    this.activeSurfspot =  activeSurfspot;
  }
}

import { Injectable } from '@angular/core';
import { Surfspot } from './Surfspot';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';

@Injectable()
export class SurfspotService {
  constructor(private _db: AngularFireDatabase) {
  }
  // fetchSurfspots(): FirebaseObjectObservable<any> {
  //   return this._db.object('/userObjects/places/sVeRmu9z9hTVd6Xf0kOJCwQNuXy1');
  // }
  fetchSurfspotList(): FirebaseListObservable<any> {
    return this._db.list('/userObjects/places/sVeRmu9z9hTVd6Xf0kOJCwQNuXy1');
  }
}

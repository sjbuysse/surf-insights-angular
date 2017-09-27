import { Injectable } from '@angular/core';
import { Surfspot } from './Surfspot';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class SurfspotService {
  constructor(private _db: AngularFireDatabase) {
  }
  fetchSurfspots(): FirebaseListObservable<any> {
    return this._db.list('/userObjects/places/sVeRmu9z9hTVd6Xf0kOJCwQNuXy1');
  }
}

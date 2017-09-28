import {Injectable} from '@angular/core';
import {Surfspot} from './Surfspot';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SurfspotService {
  constructor(private _db: AngularFireDatabase) {
  }

  fetchSurfspotList(): Observable<Surfspot[]> {
    return this._db.list('/userObjects/places/sVeRmu9z9hTVd6Xf0kOJCwQNuXy1' )
      .map(surfspots => {
        surfspots.forEach(place => {
          place.lat = place.latlng.lat;
          place.lng = place.latlng.lng;
          delete place.latlng;
        });
        return surfspots;
      });
  }
}

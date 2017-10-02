import {Injectable} from '@angular/core';
import {Surfspot} from './Surfspot';
import {AngularFireDatabase} from 'angularfire2/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';
import {Observable} from 'rxjs/Rx';
import {ImageDetails} from './ImageDetails';

@Injectable()
export class SurfspotService {
  private _surfspotListRef;

  constructor(private _db: AngularFireDatabase) {
    this._surfspotListRef = _db.list('/userObjects/places/sVeRmu9z9hTVd6Xf0kOJCwQNuXy1' );
  }

  fetchImageList(spot): Promise<ImageDetails[]> {
    return this._db.list('/userObjects/images/sVeRmu9z9hTVd6Xf0kOJCwQNuXy1/' + spot.$key )
      .first()
      .toPromise();
  }

  fetchSurfspotList(): Observable<Surfspot[]> {
    return this._surfspotListRef;
  }

  updateSurfspot(spot): void {
    delete spot.editing;
    this._surfspotListRef.update(spot.$key, spot);
  }

  updateImageList(spot, imageList): void {
    imageList.forEach(image =>
{      console.log(image);
      this._db.list('/userObjects/images/sVeRmu9z9hTVd6Xf0kOJCwQNuXy1/' + spot.$key )
        .update(image.$key, image);}
    );
  }
}

import {Inject, Injectable} from '@angular/core';
import {Surfspot} from './Surfspot';
import {AngularFireDatabase} from 'angularfire2/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/shareReplay';
import {Observable} from 'rxjs/Rx';
import {ImageDetails} from './ImageDetails';

import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';


@Injectable()
export class SurfspotService {
  private _surfspotListRef;

  constructor(private _db: AngularFireDatabase, private _firebase: FirebaseApp) {
    this._surfspotListRef = _db.list('/userObjects/places/sVeRmu9z9hTVd6Xf0kOJCwQNuXy1' );
  }

  fetchImageList(spot): Observable<ImageDetails[]> {
    return this._db.list('/userObjects/images/sVeRmu9z9hTVd6Xf0kOJCwQNuXy1/' + spot.$key ).shareReplay();
  }

  fetchSurfspotList(): Observable<Surfspot[]> {
    return this._surfspotListRef.shareReplay();
  }

  updateSurfspot(spot): void {
    delete spot.editing;
    this._surfspotListRef.update(spot.$key, spot);
  }

  updateImageList(spot, imageList): void {
    imageList.forEach(image =>
      this._db.list('/userObjects/images/sVeRmu9z9hTVd6Xf0kOJCwQNuXy1/' + spot.$key )
        .update(image.$key, image)
    );
  }

  removeImageStorage(image: ImageDetails): void {
    this._firebase.storage().refFromURL(image.url).delete();
  }

  uploadImage(spot, image: object, name: string): any {
    // upload resizedImage naar de firebase storage
    // add timestamp to name to avoid duplicate firebase references.
    const timestamp = Date.now();
    const imageStorageRef = this._firebase.storage().ref().child('/images/' + spot.$key + '/' +
      timestamp + name);
    return imageStorageRef.put(image);
  }
  uploadImageMetaData(uploadTask, spot, caption, name) {
    // Handle successful uploads on complete
    // Upload image meta data to firebase
    const downloadURL = uploadTask.snapshot.downloadURL;
    const imageKey = this._db.list('/userObjects/images/sVeRmu9z9hTVd6Xf0kOJCwQNuXy1/' + spot.$key).push({}).key;
    const imageData = {
      'url': downloadURL,
      'caption': caption,
      'name': name,
      'imageKey': imageKey
    };
    this._db.list('/userObjects/images/sVeRmu9z9hTVd6Xf0kOJCwQNuXy1/' + spot.$key).update(imageKey, imageData);
  }

  removeImageDetails(spot, image): void {
    const ref = this._db.object(`/userObjects/images/sVeRmu9z9hTVd6Xf0kOJCwQNuXy1/${spot.$key}/${image.$key}`);
    ref.remove();
  }
}

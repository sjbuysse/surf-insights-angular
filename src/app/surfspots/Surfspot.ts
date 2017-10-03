export class Surfspot {
  id: number;
  editing: boolean = false;
  info: string;
  name: string;
  latlng: {
    lat: number;
    lng: number;
  };
}

import { encode } from 'node-base64-image';

export class StaticMapCoordinate {
  constructor(longitude: number, latitude: number) {
    this.longitude = longitude;
    this.latitude = latitude;
  }

  longitude: number;
  latitude: number;
}

export class StaticMapDTO {
  constructor() {
    this.coordinates = [];
  }

  coordinates: Array<StaticMapCoordinate>;
  stationH3Idx?: number[];
}

export interface Map {
  getStaticMapImageToBlob(
    staticMapDTO: StaticMapDTO,
    imageHeight?: string,
  ): Promise<any>;
}

export class MapManager implements Map {
  /**
   * Gmail, OutLook 등 다양한 메일 서비스에서 직접 dataUrl을 포함하거나 그 이외 정책에 위배되면
   * img src를 제거하기 때문에 라이디어 API로 image upload 후 메일에 포함
   * */
  async getStaticMapImageToBlob(staticMapDTO: StaticMapDTO): Promise<any> {
    const idxSlice = Math.ceil(staticMapDTO.coordinates.length / 400);

    let googleStaticMapApiQuery = '';

    if (staticMapDTO.coordinates.length) {
      const coordinates = staticMapDTO.coordinates
        .map((coordinate, idx) => {
          return idx % idxSlice === 0 ? coordinate : null;
        })
        .filter(
          (coordinate) =>
            coordinate && coordinate?.longitude && coordinate?.longitude,
        );

      const coordinateString = coordinates
        .reduce((acc, coordinate) => {
          acc.push(
            `${String(coordinate.latitude).slice(0, 10)},${String(
              coordinate.longitude,
            ).slice(0, 10)}`,
          );
          return acc;
        }, [])
        .join('|');

      googleStaticMapApiQuery =
        'path=color:0x2946BE|weight:5|' + coordinateString;
    } else {
      googleStaticMapApiQuery =
        `center=${staticMapDTO.stationH3Idx.join(',')}` + '&zoom=15';
    }

    const staticMapUrl =
      'http://maps.googleapis.com/maps/api/staticmap?' +
      googleStaticMapApiQuery +
      '&size=720x420' +
      '&format=jpg' +
      '&key=' +
      process.env.SECRET_APP_BIZ_MOBILE_GOOGLE_API_KEY;

    const imageBuffer = await encode(staticMapUrl);

    return imageBuffer;
  }
}

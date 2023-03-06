import Any = jasmine.Any;

export class Car {
  custId: string;
  carList: Array<string>;
  //위도, 경도
  lat_lon: Map<string, Array<Array<number>>>;
}

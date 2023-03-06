import { Injectable, NotFoundException } from '@nestjs/common';
import { Interval, SchedulerRegistry } from '@nestjs/schedule';
import { Car } from './entities/car.entity';
import { map } from 'rxjs';

@Injectable()
export class CarService {
  private carArr: Car[] = [
    {
      custId: 'test1234',
      carList: ['01가1001'],
      lat_lon: new Map([
        [
          '01가1001',
          [
            [35.1104359, 126.8758168],
            [35.1101437, 126.8758168],
            [35.1098723, 126.8757785],
            [35.1096531, 126.8757657],
            [35.109413, 126.8757147],
            [35.1091416, 126.8756126],
            [35.1089224, 126.8755233],
            [35.1087345, 126.8753064],
            [35.1085362, 126.8751278],
            [35.1083901, 126.8749109],
            [35.1082753, 126.874745],
            [35.1082231, 126.8745026],
            [35.1080665, 126.8741836],
            [35.1080665, 126.8741836],
            [35.1079517, 126.8738519],
            [35.1078995, 126.8734691],
            [35.1078056, 126.8731629],
            [35.1077117, 126.872895],
            [35.1076804, 126.8725633],
            [35.1078474, 126.8724867],
            [35.1080144, 126.8724357],
            [35.1082232, 126.872474],
            [35.1084111, 126.8728312],
            [35.1085259, 126.873265],
            [35.1086882, 126.873721],
            [35.1088111, 126.8740751],
            [35.1090217, 126.8744506],
            [35.1092499, 126.8747403],
            [35.1095746, 126.8750192],
            [35.1098116, 126.8752016],
            [35.110031, 126.8754054],
            [35.1102943, 126.8755771],
            [35.1103908, 126.8756951],
          ],
        ],
        [
          '02가1234',
          [
            [35.1104359, 126.8758168],
            [35.1101437, 126.8758168],
            [35.1098723, 126.8757785],
          ],
        ],
      ]),
    },
    {
      custId: 'test2222',
      carList: ['01가1002'],
      lat_lon: new Map([
        [
          '01가1002',
          [
            [35.1104359, 126.8758168],
            [35.1101437, 126.8758168],
            [35.1098723, 126.8757785],
            [35.1096531, 126.8757657],
            [35.109413, 126.8757147],
          ],
        ],
      ]),
    },
  ];
  @Interval(5000)
  interval() {
    console.log(this.carArr[0].lat_lon.size);
    for (let i = 0; i < this.carArr.length; i++) {
      for (let j = 0; j < this.carArr[i].carList.length; j++) {
        const tempArr = this.carArr[i].lat_lon.get(
          this.carArr[i].carList[j],
        )[0];
        this.carArr[i].lat_lon.get(this.carArr[i].carList[j]).shift();
        this.carArr[i].lat_lon.get(this.carArr[i].carList[j]).push(tempArr);
        console.log(
          `${i + 1} : ${
            this.carArr[i].lat_lon.get(this.carArr[i].carList[j])[0]
          }`,
        );
      }
    }
    /*
    console.log(this.carArr.length);
    this.carArr.forEach((arr) => {
      for (let i = 0; i < arr.carList.length; i++) {
        const tempArr = this.carArr[0].lat_lon.get(arr.carList[i])[0];
        this.carArr[0].lat_lon.get(arr.carList[i]).shift();
        this.carArr[0].lat_lon.get(arr.carList[i]).push(tempArr);
      }
    });

    const tempArr = this.carArr[0].lat_lon.get('01가1001')[0];
    this.carArr[0].lat_lon.get('01가1001').shift();
    this.carArr[0].lat_lon.get('01가1001').push(tempArr);
    console.log(this.carArr[0].lat_lon.get('01가1001')[0]);*/
  }

  async getCarLocation(data) {
    const carInfo = [];

    await this.carArr.forEach((car) => {
      if (car.custId !== data.custId) {
        //throw new Error('202 API 인증키 사용불가');
        throw new NotFoundException('notFound : ' + data.custId);
      }

      console.log('length');
      console.log(data.carList.length);

      car.carList.forEach((list) => {
        for (let i = 0; i < data.carList.length; i++) {
          if (list === data.carList[i].carNum) {
            carInfo.push(list);
          }
        }
      });
    });
    console.log(carInfo);
    let resultArr = [];
    for (let i = 0; i < carInfo.length; i++) {
      resultArr.push({
        carNum: this.carArr[0].carList[i],
        gpsLat: this.carArr[0].lat_lon.get(carInfo[i])[0][0],
        gpsLong: this.carArr[0].lat_lon.get(carInfo[i])[0][1],
      });
    }

    return {
      rsltCd: '000',
      infoList: resultArr,
    };
  }
}

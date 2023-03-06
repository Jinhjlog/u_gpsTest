import { Injectable, NotFoundException } from '@nestjs/common';
import { Interval, SchedulerRegistry } from '@nestjs/schedule';
import { Car } from './entities/car.entity';
import { map } from 'rxjs';
import { raw } from 'express';

@Injectable()
export class CarService {
  private carArr: Car[] = [
    {
      custId: 'test1234', // 고객사ID
      carList: ['01가1001', '01가1002', '01가1003'], // 차량 번호 입력
      lat_lon: new Map([
        [
          '01가1001', // carList 첫 번째 차량
          [
            // 위도, 경도
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
          '01가1002', // carList 두 번째 차량
          [
            [35.1104359, 126.8758168],
            [35.1101437, 126.8758168],
            [35.1098723, 126.8757785],
          ],
        ],
        [
          '01가1003', // carList 세 번째 차량
          [
            [3, 126.8747403],
            [3, 126.8750192],
            [3, 126.8752016],
            [3, 126.8754054],
            [3, 126.8755771],
            [3, 126.8756951],
          ],
        ],
      ]),
    }, // index : carArr[0]
    {
      custId: 'test2222',
      carList: ['02가1001', '02가1002'],
      lat_lon: new Map([
        [
          '02가1001',
          [
            [35.1104359, 126.8758168],
            [35.1101437, 126.8758168],
            [35.1098723, 126.8757785],
            [35.1096531, 126.8757657],
            [35.109413, 126.8757147],
          ],
        ],
        [
          '02가1002',
          [
            [35.1104359, 126.8758168],
            [35.1101437, 126.8758168],
            [35.1098723, 126.8757785],
            [35.1096531, 126.8757657],
            [35.109413, 126.8757147],
          ],
        ],
      ]),
    }, // index : carArr[1]
    {
      custId: 'test3333',
      carList: ['03가1001'],
      lat_lon: new Map([
        [
          '03가1001',
          [
            [33333, 126.8758168],
            [33333, 126.8758168],
            [33333, 126.8757785],
            [33333, 126.8757657],
            [33333, 126.8757147],
          ],
        ],
      ]),
    }, // index : carArr[2]
  ];
  @Interval(5000) // 5초
  interval() {
    for (let i = 0; i < this.carArr.length; i++) {
      for (let j = 0; j < this.carArr[i].carList.length; j++) {
        const tempArr = this.carArr[i].lat_lon.get(
          this.carArr[i].carList[j],
        )[0];
        this.carArr[i].lat_lon.get(this.carArr[i].carList[j]).shift();
        this.carArr[i].lat_lon.get(this.carArr[i].carList[j]).push(tempArr);

        // 전체 차량 위도 경도 console.log
        console.log(
          `${i + 1}-${j + 1} : ${
            this.carArr[i].lat_lon.get(this.carArr[i].carList[j])[0]
          }`,
        );
      }
    }
  }

  async getCarLocation(data) {
    const carInfo = [];
    let rsltCd = '301';
    if (!data.custId || !data.carList || !data.carList[0].carNum) {
      return {
        rsltCd: rsltCd,
        infoList: carInfo,
      };
    }
    await this.carArr.forEach((car) => {
      if (car.custId === data.custId) {
        rsltCd = '000';
        for (let i = 0; i < car.carList.length; i++) {
          for (let j = 0; j < data.carList.length; j++) {
            if (car.carList[i] === data.carList[j].carNum) {
              carInfo.push({
                carNum: car.carList[i],
                gpsLat: car.lat_lon.get(car.carList[i])[0][0],
                gpsLong: car.lat_lon.get(car.carList[i])[0][1],
              });
            }
          }
        }
      }
    });

    if (carInfo.length <= 0) {
      rsltCd = '302';
    }

    return {
      rsltCd: rsltCd,
      infoList: carInfo,
    };
  }
}

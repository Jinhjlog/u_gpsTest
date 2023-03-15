import { Body, Controller, Post } from '@nestjs/common';
import { CarService } from './car.service';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post('/api/getCarLocation')
  getCarLocation(@Body() data) {
    return this.carService.getCarLocation(data);
  }

  @Post('/api/getCarSttus')
  getCarSttus() {
    return {
      rsltCd: '000',
      infoList: [
        {
          carNum: '01가1001',
          carStCd: '1',
        },
        {
          carNum: '01가1002',
          carStCd: '1',
        },
        {
          carNum: '01-MB-0001',
          carStCd: '1',
        },
        {
          carNum: '01가1003',
          carStCd: '0',
        },
      ],
    };
  }
}

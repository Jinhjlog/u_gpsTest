import { Body, Controller, Get } from "@nestjs/common";
import { CarService } from './car.service';

@Controller('')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get('getCarLocation')
  getCarLocation(@Body() data) {
    return this.carService.getCarLocation(data);
  }
}

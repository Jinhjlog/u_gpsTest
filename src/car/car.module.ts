import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { ScheduleModule, SchedulerRegistry } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}

import { Module } from '@nestjs/common';
import { NatsService } from 'infrastructure';
import { CommunicationModule } from 'infrastructure';
import { ActionsController } from './api.controller';
import { ApiIntervalService } from './api.interval.service';
import { CheckService } from './api.service';

@Module({
  imports: [CommunicationModule], // Solo importa el CommunicationModule
  providers: [
    {
      provide: 'msCommunication',
      useClass: NatsService,
    },
    {
      provide: 'checkService',
      useClass: CheckService,
    },
    ApiIntervalService,
  ],
  controllers: [ActionsController],
})
export class ApiModule {}

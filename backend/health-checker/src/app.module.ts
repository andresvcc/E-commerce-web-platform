import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommunicationModule } from 'infrastructure';
import config from './config/config';
import { busConfig } from 'infrastructure';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthCheckModule } from 'infrastructure';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config, busConfig],
    }),
    ApiModule,
    CommunicationModule,
    HealthCheckModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

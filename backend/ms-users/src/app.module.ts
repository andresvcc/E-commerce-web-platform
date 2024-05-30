import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ActionsModule } from './actions/actions.module';
import config from './config/config';
import { busConfig } from 'infrastructure';
import { HealthCheckModule } from 'infrastructure';
import { CommunicationModule } from 'infrastructure';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config, busConfig],
    }),
    ActionsModule,
    CommunicationModule,
    HealthCheckModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

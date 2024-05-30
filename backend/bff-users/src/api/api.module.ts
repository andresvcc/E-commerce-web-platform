import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { NatsService } from 'infrastructure';
import { CommunicationModule } from 'infrastructure';
import { UsersResolver } from './users.resolver';
import { OrganisationsResolver } from './organisations.resolver';

import {
  HealthCheckController,
  HealthCheckResolver,
} from './health-check.controller';

@Module({
  imports: [
    CommunicationModule,
    JwtModule.register({
      secret: 'tuSecretSuperSecreto',
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [HealthCheckController],
  providers: [
    {
      provide: 'msCommunication',
      useClass: NatsService,
    },
    UsersResolver,
    OrganisationsResolver,
    HealthCheckResolver,
  ],
})
export class ApiModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule } from 'infrastructure';
import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';
import { HealthCheckController } from './health-check.controller';
import { CommunicationModule } from 'infrastructure';
import { NatsService } from 'infrastructure';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    CommunicationModule,
    JwtModule.register({
      secret: 'tuSecretSuperSecreto', // Usa una clave secreta real aquí
      signOptions: { expiresIn: '30d' }, // Configura la duración del token
    }),
  ],
  controllers: [ActionsController, HealthCheckController],
  providers: [
    ActionsService,
    {
      provide: 'msCommunication',
      useClass: NatsService,
    },
  ],
})
export class ActionsModule {}

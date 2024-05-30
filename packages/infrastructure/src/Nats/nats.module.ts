import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { NatsService } from './nats.service';

@Module({
  providers: [
    {
      provide: 'PRIMARY_BUS',
      useFactory: (config: ConfigService) => {
        const { transport, options } = config.get('busConfig');
        return ClientProxyFactory.create({
          transport,
          options,
        });
      },
      inject: [ConfigService],
    },
    NatsService,
  ],
  exports: ['PRIMARY_BUS', NatsService],
})
export class CommunicationModule {}

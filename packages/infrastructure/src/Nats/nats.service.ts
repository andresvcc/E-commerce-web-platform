import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { NatsMessagePattern } from './nats-utils.service';
import { IMSCommunication } from 'src/types';

@Injectable()
export class NatsService implements IMSCommunication {
  private nats: NatsMessagePattern;

  constructor(@Inject('PRIMARY_BUS') private bus: ClientProxy, private config: ConfigService) {
    this.nats = new NatsMessagePattern(bus, config);
  }

  async send(messagePattern: string, payload: any, hideLogs = false): Promise<any> {
    return this.nats.send(messagePattern, payload, hideLogs);
  }

  async emit(eventPattern: string, payload: any, hideLogs = false): Promise<void> {
    return this.nats.emit(eventPattern, payload, hideLogs);
  }

  trace(payload: any) {
    this.nats.trace(payload);
  }
}

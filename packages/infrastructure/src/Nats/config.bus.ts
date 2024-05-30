import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export const busConfig = registerAs('busConfig', () => ({
  transport: Transport.NATS,
  options: {
    servers: ['nats://149.102.141.22:4222'],
    queue: 'rithmo',
    token: 'T0pS3cr3trr',
  },
}));

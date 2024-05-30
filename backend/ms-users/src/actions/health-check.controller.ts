import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { healthChecker } from 'infrastructure';

@Controller()
export class HealthCheckController {
  @MessagePattern({ cmd: 'ms-users:health-check' })
  async healthCheck(@Payload() payload: any) {
    const { name, version, uptime } = await healthChecker();
    console.log('health-check', payload);
    return { name, version, uptime };
  }
}

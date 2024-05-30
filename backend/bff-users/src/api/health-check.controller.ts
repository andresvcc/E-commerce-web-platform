/* eslint-disable @typescript-eslint/ban-types */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { healthChecker } from 'infrastructure';
import { Resolver } from '@nestjs/graphql';
import { IMSCommunication } from 'infrastructure';
import { UseFilters, Inject } from '@nestjs/common';
import { ApiExceptionsFilter } from 'infrastructure';

@Controller()
export class HealthCheckController {
  @MessagePattern({ cmd: 'bff-users:health-check' })
  async healthCheck(@Payload() payload: any) {
    const { name, version, uptime } = await healthChecker();
    console.log('health-check', payload);
    return { name, version, uptime };
  }
}

class HealthCheck {
  keyCode: string;
  payload: any;
}

@Resolver(() => HealthCheck)
@UseFilters(new ApiExceptionsFilter())
export class HealthCheckResolver {
  constructor(
    @Inject('msCommunication')
    private readonly msCommunication: IMSCommunication,
  ) {}

  // this is a method to test the health of the service
  @MessagePattern({ cmd: 'bff-users:health-check' })
  async healthCheck(@Payload() payload: any) {
    console.log('health-check', payload);
    const keyCode = Math.random().toString(36).substring(2, 15);
    return { keyCode, ...payload };
  }
}

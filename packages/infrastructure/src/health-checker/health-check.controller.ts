import { Controller, Get, Query, Req } from '@nestjs/common';
import { MessagePattern, EventPattern, Payload } from '@nestjs/microservices';
import { healthChecker } from './health-checker.service';

@Controller()
export class HealthCheckController {
  private name: string;
  private version: string;
  private uptime: number;

  constructor() {
    this.initialisation();
  }

  async initialisation() {
    const { name, version, uptime } = await healthChecker();
    this.name = name;
    this.version = version;
    this.uptime = uptime;
  }

  @Get('health-check')
  async healthCheck() {
    return {
      name: this.name,
      version: this.version,
      uptime: this.uptime,
      isHealthy: true,
    };
  }

  @Get('health')
  async health() {
    return {
      name: this.name,
    };
  }
}

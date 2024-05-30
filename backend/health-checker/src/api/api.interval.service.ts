/* eslint-disable @typescript-eslint/ban-types */
import { ICheckService, IMSCommunication } from 'infrastructure';
import { Inject } from '@nestjs/common';
import { UseFilters } from '@nestjs/common';
import { ApiExceptionsFilter } from 'infrastructure';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { Interval } from '@nestjs/schedule';

@UseFilters(new ApiExceptionsFilter())
export class ApiIntervalService {
  constructor(
    @Inject('msCommunication')
    private readonly msCommunication: IMSCommunication,
    @Inject('checkService')
    private readonly checkService: ICheckService, // Inyecta ApiService aquí
  ) {}

  @Interval(60000)
  async bffUsersCheck() {
    this.checkService.checkMicroservice('bff-users'); // Llama al método checkMicroservice
  }

  @Interval(60000)
  async msUsersCheck() {
    this.checkService.checkMicroservice('ms-users'); // Llama al método checkMicroservice
  }

  @Interval(60000)
  async msOrganisationsCheck() {
    this.checkService.checkMicroservice('ms-organisations'); // Llama al método checkMicroservice
  }

  @MessagePattern({ cmd: 'ms-users:find' })
  async find(@Payload() payload: any): Promise<any> {
    console.log('find', payload);
    return { keyCode: 44 };
  }
}

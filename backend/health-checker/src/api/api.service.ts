import { Injectable, Inject, Logger } from '@nestjs/common';
import { ICheckService, IMSCommunication } from 'infrastructure';

@Injectable()
export class CheckService implements ICheckService {
  private readonly logger = new Logger(CheckService.name);

  constructor(
    @Inject('msCommunication')
    private readonly msCommunication: IMSCommunication,
  ) {}

  async checkMicroservice(name: string): Promise<void> {
    try {
      const response = await this.msCommunication.send(
        `${name}:health-check`,
        {
          id: 323,
        },
        true,
      );

      if (name === response.name) {
        this.logStatus(name, 'OK');
      } else {
        this.logStatus(name, 'BAD');
      }
    } catch (error) {
      if (error.message.includes('MICROSERVICE_NOT_FOUND')) {
        this.logStatus(name, 'DEAD');
      } else {
        this.logger.error(
          `Error checking microservice ${name}: ${error.message}`,
        );
      }
    }
  }

  private logStatus(name: string, status: string): void {
    const message = `The microservice ${name} is ${status}: ${new Date().toISOString()}`;
    status == 'OK' ? this.logger.log(message) : this.logger.error(message);
  }
}

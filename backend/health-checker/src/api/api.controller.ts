import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, EventPattern, Payload } from '@nestjs/microservices';
import { User, UsersArgs } from 'data-model';

@Controller()
export class ActionsController {
  @EventPattern('health-checker:disaster')
  replaceEmoji(@Payload() payload: any) {
    console.log('health-checker:disaster', payload);
    return { keyCode: 44 };
  }
}

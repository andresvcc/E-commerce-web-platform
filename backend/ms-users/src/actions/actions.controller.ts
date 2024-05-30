import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Result, Token, User, UserAuth, UserInput, UsersArgs } from 'data-model';
import { ActionsService } from './actions.service'; // Asegúrate de importar desde el path correcto.

@Controller()
export class ActionsController {
  constructor(private readonly usersService: ActionsService) {}

  @MessagePattern({ cmd: 'ms-users:create' })
  async test(@Payload() payload: UserInput): Promise<Result<User>> {
    const result = await this.usersService.createUser(payload);
    return result;
  }

  @MessagePattern({ cmd: 'ms-users:find' })
  async find(@Payload() payload: { args: UsersArgs }): Promise<Result<User[]>> {
    return await this.usersService.findUserByCriteria(payload.args);
  }

  @MessagePattern({ cmd: 'ms-users:auth' })
  async auth(@Payload() payload: UserAuth): Promise<Result<Token>> {
    return await this.usersService.auth(payload);
  }
}

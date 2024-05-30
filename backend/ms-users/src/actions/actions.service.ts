import { Injectable, Inject } from '@nestjs/common';
import { IMSCommunication, UserRepository } from 'infrastructure';
import { findArgsByCriteria, Token, UserAuth } from 'data-model';
import { workflowCreateUser } from './workflows/createUser.workflow';
import { User, UserInput, UsersArgs, Result } from 'data-model';
import { workflowFindUser } from './workflows/findUsers.workflow';
import { workflowAuthUser } from './workflows/authUsers.workflow';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ActionsService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject('msCommunication')
    private readonly msCommunication: IMSCommunication,
  ) {}

  async createUser(userInputparams: UserInput): Promise<Result<User>> {
    return workflowCreateUser({
      userInputparams,
      create: (userInputparams: UserInput) => this.userRepository.create(userInputparams),
    });
  }

  async findUserByCriteria({ page, limit, ...criteria }: UsersArgs): Promise<Result<User[]>> {
    return workflowFindUser({
      find: (params: findArgsByCriteria) => this.userRepository.findByCriteria(params),
      findArgs: { page, limit, ...criteria },
    });
  }

  async auth(userAuthParams: UserAuth): Promise<Result<Token>> {
    const result = await workflowAuthUser({
      userAuthParams,
      find: (params: findArgsByCriteria) => this.userRepository.findByCriteria(params),
      generateJwt: (payload: any) => this.generateJwt(payload),
    });

    return result;
  }

  async generateJwt(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}

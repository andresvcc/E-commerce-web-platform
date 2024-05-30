/* eslint-disable @typescript-eslint/ban-types */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { IMSCommunication } from 'infrastructure';
import {
  Result,
  Token,
  User,
  UserInput,
  UsersArgs,
  UserUpdate,
} from 'data-model';
import { UseFilters, UseGuards, Inject } from '@nestjs/common';
import { ApiExceptionsFilter } from 'infrastructure';
import { JwtAuthGuard } from '../guards';
import { JwtData } from 'src/guards/jwt.decorator';

@Resolver(() => User)
@UseFilters(new ApiExceptionsFilter())
export class UsersResolver {
  constructor(
    @Inject('msCommunication')
    private readonly msCommunication: IMSCommunication,
  ) {}

  // this is a method to find the users by criteria
  @UseGuards(JwtAuthGuard)
  @Query(() => [User], { name: 'Users' })
  async getUsers(
    @Args() args: UsersArgs,
    @JwtData() jwtData: any,
  ): Promise<User[]> {
    const { errors, result }: Result<User[]> = await this.msCommunication.send(
      'ms-users:find',
      {
        args,
      },
    );

    if (errors) {
      throw new Error(errors[0]);
    }

    return result;
  }

  // this is a method to authenticate the user by username and password
  @Mutation(() => Token, { name: 'auth' })
  async auth(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<Token> {
    const response: Result<Token> = await this.msCommunication.send(
      'ms-users:auth',
      {
        username,
        password,
      },
    );

    const { errors, result } = response;

    if (errors) {
      throw new Error(errors[0]);
    }

    return result;
  }

  // this is a method to create a new user
  @Mutation(() => User, { name: 'createUser' })
  async createUser(@Args('input') userInput: UserInput): Promise<User> {
    const response: Result<User> = await this.msCommunication.send(
      'ms-users:create',
      userInput,
    );

    const { errors, result } = response;

    if (errors) {
      throw new Error(errors[0]);
    }

    return result;
  }

  // this is a method to update a user
  @UseGuards(JwtAuthGuard)
  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(
    @Args('input') userUpdate: UserUpdate,
    @JwtData() jwtData: any,
  ): Promise<User> {
    const response: Result<User> = await this.msCommunication.send(
      'ms-users:update',
      {
        args: userUpdate,
        userId: jwtData._id,
      },
    );

    const { errors, result } = response;

    if (errors) {
      throw new Error(errors[0]);
    }

    return result;
  }

  // this is a method to delete a user
  @UseGuards(JwtAuthGuard)
  @Mutation(() => User, { name: 'deleteUser' })
  async deleteUser(
    @Args('input') userDeleteId: String,
    @JwtData() jwtData: any,
  ): Promise<Boolean> {
    const response: Result<Boolean> = await this.msCommunication.send(
      'ms-users:delete',
      {
        args: userDeleteId,
        userId: jwtData._id,
      },
    );

    const { errors, result } = response;

    if (errors) {
      throw new Error(errors[0]);
    }

    return result;
  }
}

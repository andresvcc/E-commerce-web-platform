import { Field, InputType } from '@nestjs/graphql';
import { toFormatTime } from 'helpers';
import { DataValidator } from '../../DataValidator';
import { Token } from '../Token';
import { UserRights } from './users.rights.type';
import { UserStatus } from './users.status.type';
import { Supervisor, SupervisorInput } from './users.supervisor.type';

/*
this class is used to create a new user objet and to validate the data before creating it. (object value pattern)

@InputType() is used to define the input type for the graphql schema.
@Field() is used to define the fields for the graphql schema.
*/

type UserUpdateValues = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
};

@InputType()
export class UserUpdate {
  @Field(() => String, { description: 'Email', nullable: true })
  readonly email?: string;

  @Field(() => String, { description: 'HashPassword', nullable: true })
  readonly password?: string;

  @Field(() => String, { description: 'First name', nullable: true })
  readonly firstName?: string;

  @Field(() => String, { description: 'Last name', nullable: true })
  readonly lastName?: string;

  @Field(() => String, { description: 'Date of birth', nullable: true })
  readonly dateOfBirth?: string;

  constructor(data: UserUpdateValues) {
    if (data) {
      if (data.email) {
        DataValidator.for(data.email).emailIntegrity();
        this.email = data.email;
      }

      if (data.password) {
        DataValidator.for(data.password).stringIntegrity();
        this.password = data.password;
      }

      if (data.firstName) {
        DataValidator.for(data.firstName).stringIntegrity();
        this.firstName = data.firstName;
      }

      if (data.lastName) {
        DataValidator.for(data.lastName).stringIntegrity();
        this.lastName = data.lastName;
      }

      if (data.dateOfBirth) {
        DataValidator.for(data.dateOfBirth).dateIntegrity();
        this.dateOfBirth = data.dateOfBirth;
      }
    }
  }

  public static create(userUpdateValues: UserUpdateValues): UserUpdate {
    return new UserUpdate(userUpdateValues);
  }
}

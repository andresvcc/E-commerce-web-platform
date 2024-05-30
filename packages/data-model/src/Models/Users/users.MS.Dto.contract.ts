import { ObjectType, Field } from '@nestjs/graphql';
import { DataValidator, Dto } from '../../DataValidator';
import { Organisation } from '../Organisations/organisations.MS.Dto.contract';
import { Token } from '../Token';
import { Membership } from './users.membre.type';
import { UserRights } from './users.rights.type';
import { UserStatus } from './users.status.type';
import { Supervisor } from './users.supervisor.type';

/*
UserDto class is used to define the Data Transfer Object (DTO) for the user model.
User Class is used to define the user object type for the workflow domain model data.


@Dto() is used to define the data validator fields in the DTO, fields without this decorator will not be checked and will not belong to the object definition.
@ObjectType() is used to define the object type for the graphql schema.
@Field() is used to define the fields for the graphql schema.
*/

export class UserDto {
  @Dto({ type: 'string', required: true })
  _id: string;

  @Dto({ type: 'string', required: true })
  username: string;

  @Dto({ type: 'string', required: false })
  email?: string;

  @Dto({ type: 'string', required: false })
  firstName?: string;

  @Dto({ type: 'string', required: false })
  lastName?: string;

  @Dto({ type: 'string', required: false })
  dateOfBirth?: string;

  @Dto({ type: 'string', required: true })
  status: UserStatus;

  @Dto({ type: 'Object', required: false })
  supervisors?: Supervisor[];

  @Dto({ type: 'Object', required: true })
  rights: UserRights[];

  @Dto({ type: 'Object', required: true })
  memberships: Membership[];
}

@ObjectType()
export class User {
  @Dto({ type: 'string', required: true })
  @Field(() => String, { description: 'Id' })
  _id: string;

  @Dto({ type: 'string', required: true })
  @Field(() => String, { description: 'Username' })
  username: string;

  @Dto({ type: 'string', required: false })
  @Field(() => String, { nullable: true, description: 'Email' })
  email?: string | null;

  @Dto({ type: 'string', required: false })
  @Field(() => String, { nullable: true, description: 'First name' })
  firstName?: string | null;

  @Dto({ type: 'string', required: false })
  @Field(() => String, { nullable: true, description: 'Last name' })
  lastName?: string | null;

  @Dto({ type: 'string', required: false })
  @Field(() => String, { nullable: true, description: 'Date of birth' })
  dateOfBirth?: string | null;

  @Dto({ type: 'string', required: true })
  @Field(() => String, { description: 'User Category' })
  status: UserStatus;

  @Dto({ type: 'Object', required: false })
  @Field(() => [Supervisor], { description: 'Supervisor', nullable: true })
  supervisors?: Supervisor[];

  @Dto({ type: 'Object', required: true })
  @Field(() => [UserRights], { description: 'User rights' })
  rights: UserRights[];

  @Dto({ type: 'Object', required: true })
  @Field(() => [Membership], { description: 'Membership' })
  memberships: Membership[];

  constructor(data: UserDto) {
    if (data) {
      DataValidator.for(data.email).emailIntegrity();
      this._id = data._id;
      this.email = data.email;
      this.username = data.username;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.dateOfBirth = data.dateOfBirth;
      this.status = data.status;
      this.rights = data.rights;
      this.supervisors = data.supervisors;
      this.memberships = data.memberships;
    }
  }

  public static create(data: UserDto): User {
    return new User(data);
  }

  public static verify(data: UserDto): boolean {
    const isValid = DataValidator.for(data).withDto(UserDto);
    return isValid;
  }
}

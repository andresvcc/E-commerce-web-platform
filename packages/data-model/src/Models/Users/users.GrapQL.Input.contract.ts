import { Field, InputType } from '@nestjs/graphql';
import { toFormatTime } from 'helpers';
import { DataValidator } from '../../DataValidator';
import { Token } from '../Token';
import { Membership, MembershipInput } from './users.membre.type';
import { UserRights } from './users.rights.type';
import { UserStatus } from './users.status.type';
import { Supervisor, SupervisorInput } from './users.supervisor.type';

/*
this class is used to create a new user objet and to validate the data before creating it. (object value pattern)

@InputType() is used to define the input type for the graphql schema.
@Field() is used to define the fields for the graphql schema.
*/

class RegularUser {
  readonly username: string;
  readonly email: string;
  readonly token: Token;
  readonly firstName: string;
  readonly lastName: string;
  readonly dateOfBirth: string;
  readonly rights: UserRights[];
  readonly status = UserStatus.Pending_Verification;
  readonly supervisors: Supervisor[];
  readonly memberships: MembershipInput[];

  constructor(data: {
    username?: string;
    email?: string;
    token?: Token;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    visitor?: boolean;
    supervisors?: Supervisor[];
    memberships?: MembershipInput[];
  }) {
    if (data) {
      DataValidator.for(data.username).stringIntegrity();
      this.username = data.username;

      DataValidator.for(data.email).emailIntegrity();
      this.email = data.email;

      DataValidator.for(data.token.value).stringIntegrity();
      this.token = data.token;

      DataValidator.for(data.firstName).stringIntegrity();
      this.firstName = data.firstName;

      DataValidator.for(data.lastName).stringIntegrity();
      this.lastName = data.lastName;

      DataValidator.for(data.dateOfBirth).dateIntegrity();
      this.dateOfBirth = data.dateOfBirth;

      data.supervisors.forEach((supervisor) => {
        try {
          DataValidator.for(supervisor._id).stringIntegrity();
          DataValidator.for({
            startDate: supervisor.oversightStartDate,
            endDate: supervisor.oversightEndDate,
          }).rageDatesIntegrity();
        } catch (error: any) {
          throw new Error(`DATA_VALIDATION: Supervisor ${supervisor._id} is not valid: ${error.message}`);
        }
      });
      this.supervisors = data.supervisors;

      data.memberships.forEach((membership) => {
        try {
          DataValidator.for(membership._id).stringIntegrity();
          DataValidator.for({
            startDate: membership.startDate,
            endDate: membership.endDate,
          }).rageDatesIntegrity();
        } catch (error: any) {
          throw new Error(`DATA_VALIDATION: Membership ${membership._id} is not valid: ${error.message}`);
        }
      });
      this.memberships = data.memberships;

      this.rights = [UserRights.User];
    }
  }
}

class Visitor {
  readonly username: string;
  readonly email: string;
  readonly firstName: string;
  readonly hashPassword: string;
  readonly lastName: string;
  readonly rights: UserRights[];
  readonly status = UserStatus.Active;
  readonly supervisors: SupervisorInput[];
  readonly memberships: MembershipInput[];

  constructor(data: { username?: string; supervisors?: Supervisor[]; memberships?: MembershipInput[] }) {
    if (data) {
      if (!data.supervisors || !Array.isArray(data.supervisors) || data.supervisors.length === 0) {
        throw new Error('A visitor must have at least one supervisor');
      }

      data.supervisors.forEach((supervisor) => {
        try {
          DataValidator.for(supervisor._id).stringIntegrity();
          DataValidator.for({
            startDate: supervisor.oversightStartDate,
            endDate: supervisor.oversightEndDate,
          }).rageDatesIntegrity();
        } catch (error: any) {
          throw new Error(`DATA_VALIDATION: Supervisor ${supervisor._id} is not valid: ${error.message}`);
        }
      });
      this.supervisors = data.supervisors;

      data.memberships.forEach((membership) => {
        try {
          DataValidator.for(membership._id).stringIntegrity();
          DataValidator.for({
            startDate: membership.startDate,
            endDate: membership.endDate,
          }).rageDatesIntegrity();
        } catch (error: any) {
          throw new Error(`DATA_VALIDATION: Membership ${membership._id} is not valid: ${error.message}`);
        }
      });
      this.memberships = data.memberships;

      const primarySupervisor = data.supervisors[0];

      const email = `${data.username}@${primarySupervisor._id}.visitor`;
      DataValidator.for(email).emailIntegrity();
      this.email = email;

      DataValidator.for(data.username).stringIntegrity();
      this.username = data.username;

      this.rights = [UserRights.Visitor];
    }
  }
}

@InputType()
export class UserInput {
  @Field(() => String, { description: 'User name' })
  readonly username?: string;

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

  @Field(() => Boolean, { description: 'Visitor', nullable: true })
  readonly visitor?: boolean;

  @Field(() => [SupervisorInput], { description: 'Supervisor', nullable: true })
  readonly supervisors?: SupervisorInput[];

  @Field(() => [MembershipInput], { description: 'Membership' })
  readonly memberships: MembershipInput[];

  readonly rights?: UserRights[];
  readonly status?: UserStatus;

  public static async create(data: {
    username: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    visitor?: boolean;
    supervisors?: SupervisorInput[];
    memberships: MembershipInput[];
  }): Promise<UserInput> {
    if (data.visitor) {
      return new Visitor(data);
    } else {
      const token = await Token.createByPassword(data.password);
      return new RegularUser({ ...data, token });
    }
  }
}

import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  Student = 'Student',
  Teacher = 'Teacher',
  Admin = 'Admin',
}

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'The role of users in the system',
});

@ObjectType()
export class Membership {
  @Field(() => String, { description: 'Organisation _id' })
  readonly _id: string;

  @Field(() => UserRole, { description: 'UserRole' })
  readonly role: UserRole;

  @Field(() => String, { description: 'StartDate' })
  readonly startDate: String;

  @Field(() => String, { description: 'EndDate', nullable: true })
  readonly endDate?: String | null;
}

@InputType()
export class MembershipInput {
  @Field(() => String, { description: 'Organisation _id' })
  readonly _id: string;

  @Field(() => String, { description: 'UserRole' })
  readonly role: UserRole;

  @Field(() => String, { description: 'StartDate' })
  readonly startDate: String;

  @Field(() => String, { description: 'EndDate', nullable: true })
  readonly endDate: String | null;
}

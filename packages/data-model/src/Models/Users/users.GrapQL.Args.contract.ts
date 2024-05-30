import { Field, Int, ArgsType } from '@nestjs/graphql';
import { Criteria } from '../../SearchCriteria';

/*
this type of class is used to define the arguments used to find users in the database according to several parameters defined by criteria.

@ArgsType() is used to define the arguments for the graphql schema.
@Field() is used to define the fields for the graphql schema.
Criteria type is used to define the search criteria for the database.
*/

@ArgsType()
export class UsersArgs {
  @Field((type) => Criteria, { nullable: true })
  _id?: Criteria;

  @Field((type) => Criteria, { nullable: true })
  username?: Criteria;

  @Field((type) => Criteria, { nullable: true })
  email?: Criteria;

  @Field((type) => Criteria, { nullable: true })
  firstName?: Criteria;

  @Field((type) => Criteria, { nullable: true })
  lastName?: Criteria;

  @Field((type) => Criteria, { nullable: true })
  dateOfBirth?: Criteria;

  @Field((type) => Criteria, { nullable: true })
  status?: Criteria;

  @Field(() => Criteria, { description: 'User rights', nullable: true })
  rights?: Criteria;

  @Field(() => Int, { description: 'page' })
  page: number;

  @Field(() => Int, { description: 'limit' })
  limit: number;
}

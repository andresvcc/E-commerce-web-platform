import { Field, Int, ArgsType } from '@nestjs/graphql';
import { Criteria } from '../../SearchCriteria';

@ArgsType()
export class OrganisationsArgs {
  @Field((type) => Criteria, { nullable: true, description: 'Id' })
  _id?: Criteria;

  @Field((type) => Criteria, { nullable: true, description: 'Name' })
  name?: Criteria;

  @Field((type) => Criteria, { nullable: true, description: 'Address' })
  address?: Criteria;

  @Field((type) => Criteria, { nullable: true, description: 'Telephone' })
  telephone?: Criteria;

  @Field((type) => Criteria, { nullable: true, description: 'status' })
  status?: Criteria;

  @Field(() => Int, { description: 'page' })
  page: number;

  @Field(() => Int, { description: 'limit' })
  limit: number;
}

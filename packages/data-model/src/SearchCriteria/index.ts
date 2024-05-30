import { InputType, Field, Int } from '@nestjs/graphql';
import { stringOrNumber, StringOrNumber } from '../ScalarObject';
import { User } from '../Models/Users';
import { Organisation } from '../Models/Organisations';

// Definimos el criterio
@InputType()
export class Criteria {
  @Field(() => StringOrNumber, { nullable: true })
  exact?: stringOrNumber;

  @Field(() => [Int], { nullable: true })
  between?: [number, number];

  @Field(() => String, { nullable: true })
  includes?: string;

  @Field(() => [String], { nullable: true })
  notIncludes?: string[];

  @Field(() => String, { nullable: true })
  startsWith?: string;

  @Field(() => String, { nullable: true })
  endsWith?: string;

  @Field(() => String, { nullable: true })
  hasAttribute?: string;

  @Field(() => String, { nullable: true })
  notHasAttribute?: string;

  @Field(() => String, { nullable: true })
  not?: string;
}

export class Criterias {
  [key: string]: Criteria;
}

export type findArgsByCriteria = {
  page: number;
  limit: number;
  criteria: Criterias;
};

export type findUsersByCriteria = (params: findArgsByCriteria) => Promise<RepositoryResponse<User[]>>;
export type findOrganisationsByCriteria = (params: findArgsByCriteria) => Promise<RepositoryResponse<Organisation[]>>;

export class RepositoryResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  totalPages?: number;
  page?: number;
  limit?: number;
}

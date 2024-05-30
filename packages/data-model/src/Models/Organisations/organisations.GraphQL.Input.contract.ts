import { Field, InputType } from '@nestjs/graphql';
import { toFormatTime } from 'helpers';
import { DataValidator } from '../../DataValidator';
import { Token } from '../Token';
import { OrganisationStatus } from './organisations.status.type';

@InputType()
export class OrganisationInput {
  @Field(() => String, { description: 'Name' })
  readonly name: string;

  @Field(() => String, { nullable: true, description: 'Address' })
  readonly address?: string;

  @Field(() => String, { nullable: true, description: 'Telephone' })
  readonly telephone?: string;

  @Field(() => String, { nullable: true, description: 'Logo' })
  readonly logo?: string;

  readonly status: OrganisationStatus;

  constructor(data: { name: string; address?: string; telephone?: string; logo?: string }) {
    if (data) {
      DataValidator.for(data.name).stringIntegrity();
      DataValidator.for(data.address).stringIntegrity();
      DataValidator.for(data.telephone).stringIntegrity();
      DataValidator.for(data.logo).stringIntegrity();
      this.name = data.name;
      this.address = data.address;
      this.telephone = data.telephone;
      this.logo = data.logo;
      this.status = OrganisationStatus.Pending_Verification;
    }
  }

  public static async create(data: {
    name: string;
    address?: string;
    telephone?: string;
    logo?: string;
  }): Promise<OrganisationInput> {
    return new OrganisationInput(data);
  }
}

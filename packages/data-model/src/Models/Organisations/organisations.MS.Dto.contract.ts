import { ObjectType, Field } from '@nestjs/graphql';
import { DataValidator, Dto } from '../../DataValidator';
import { Token } from '../Token';
import { OrganisationStatus } from './organisations.status.type';

export class OrganisationDto {
  @Dto({ type: 'string', required: true })
  _id: string;

  @Dto({ type: 'string', required: true })
  name: string;

  @Dto({ type: 'string', required: false })
  address?: string;

  @Dto({ type: 'string', required: false })
  telephone?: string;

  @Dto({ type: 'string', required: false })
  logo?: string;

  @Dto({ type: 'string', required: true })
  status: OrganisationStatus;
}

@ObjectType()
export class Organisation {
  @Dto({ type: 'string', required: true })
  @Field(() => String, { description: 'Id' })
  _id: string;

  @Dto({ type: 'string', required: true })
  @Field(() => String, { description: 'Name' })
  name: string;

  @Dto({ type: 'string', required: false })
  @Field(() => String, { nullable: true, description: 'Address' })
  address?: string | null;

  @Dto({ type: 'string', required: false })
  @Field(() => String, { nullable: true, description: 'Telephone' })
  telephone?: string | null;

  @Dto({ type: 'string', required: false })
  @Field(() => String, { nullable: true, description: 'Logo' })
  logo?: string | null;

  @Dto({ type: 'string', required: true })
  @Field(() => String, { description: 'Status' })
  status: OrganisationStatus;

  constructor(data: OrganisationDto) {
    if (data) {
      DataValidator.for(data.name).stringIntegrity();
      DataValidator.for(data.address).stringIntegrity();
      DataValidator.for(data.telephone).stringIntegrity();
      DataValidator.for(data.logo).stringIntegrity();
      this._id = data._id;
      this.name = data.name;
      this.address = data.address;
      this.telephone = data.telephone;
      this.logo = data.logo;
      this.status = OrganisationStatus.Pending_Verification;
    }
  }

  public static create(data: OrganisationDto): Organisation {
    return new Organisation(data);
  }

  public static verify(data: OrganisationDto): boolean {
    const isValid = DataValidator.for(data).withDto(OrganisationDto);
    return isValid;
  }
}

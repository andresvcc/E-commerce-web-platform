/* eslint-disable @typescript-eslint/ban-types */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { IMSCommunication } from 'infrastructure';
import {
  Result,
  Organisation,
  OrganisationInput,
  OrganisationUpdate,
} from 'data-model';
import { UseFilters, UseGuards, Inject } from '@nestjs/common';
import { ApiExceptionsFilter } from 'infrastructure';
import { JwtAuthGuard } from '../guards';
import { JwtData } from 'src/guards/jwt.decorator';
import { workflowFindOrganisations } from './workflows/workflowFindOrganisations';

@Resolver(() => Organisation)
@UseFilters(new ApiExceptionsFilter())
export class OrganisationsResolver {
  constructor(
    @Inject('msCommunication')
    private readonly msCommunication: IMSCommunication,
  ) {}

  // this is a method to find the organisations by criteria
  @UseGuards(JwtAuthGuard)
  @Query(() => [Organisation], { name: 'Organisations' })
  async getOrganisation(@JwtData() jwtData: any): Promise<Organisation[]> {
    const { errors, result }: Result<Organisation[]> =
      await workflowFindOrganisations({
        userId: jwtData._id,
        msCommunication: this.msCommunication,
      });

    if (errors) {
      throw new Error(errors[0]);
    }

    return result;
  }

  // this is a method to create a new organisation
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Organisation, { name: 'createOrganisation' })
  async createOrganisation(
    @Args('input') organisationInput: OrganisationInput,
    @JwtData() jwtData: any,
  ): Promise<Organisation> {
    const response: Result<Organisation> = await this.msCommunication.send(
      'ms-organisations:create',
      {
        args: organisationInput,
        userId: jwtData._id,
      },
    );

    const { errors, result } = response;

    if (errors) {
      throw new Error(errors[0]);
    }

    return result;
  }

  // this is a method to update a organisation
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Organisation, { name: 'updateOrganisation' })
  async updateOrganisation(
    @Args('input') organisationUpdate: OrganisationUpdate,
    @JwtData() jwtData: any,
  ): Promise<Organisation> {
    const response: Result<Organisation> = await this.msCommunication.send(
      'ms-organisations:update',
      {
        args: organisationUpdate,
        userId: jwtData._id,
      },
    );

    const { errors, result } = response;

    if (errors) {
      throw new Error(errors[0]);
    }

    return result;
  }

  // this is a method to delete a organisation
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Organisation, { name: 'deleteOrganisation' })
  async deleteOrganisation(
    @Args('input') OrganisationId: String,
    @JwtData() jwtData: any,
  ): Promise<Organisation> {
    const response: Result<Organisation> = await this.msCommunication.send(
      'ms-organisations:delete',
      {
        args: OrganisationId,
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

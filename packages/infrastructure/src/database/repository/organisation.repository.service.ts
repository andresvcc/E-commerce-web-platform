import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RepositoryService } from './repository.service';
import { Organisation, OrganisationInput, OrganisationModel } from 'data-model';
import { RepositoryResponse } from 'data-model';

@Injectable()
export class OrganisationRepository {
  private repositoryService: RepositoryService<OrganisationModel>;

  constructor(@InjectModel('Organisation') private organisationModel: Model<OrganisationModel>) {
    this.repositoryService = new RepositoryService(organisationModel);
  }

  async findByCriteria({ page, limit, criteria }): Promise<RepositoryResponse<Organisation[]>> {
    const organisations: RepositoryResponse<Organisation[]> = await this.repositoryService.findByCriteria({
      page,
      limit,
      criteria,
    });
    return organisations;
  }

  async findOne(id: string): Promise<RepositoryResponse<Organisation>> {
    const organisation: RepositoryResponse<Organisation> = await this.repositoryService.findOne(id);
    return organisation;
  }

  async create(entity: OrganisationInput): Promise<RepositoryResponse<Organisation>> {
    const createdOrganisation: RepositoryResponse<Organisation> = await this.repositoryService.create(entity);
    return createdOrganisation;
  }

  async update(id: string, updateDto: Partial<OrganisationModel>): Promise<RepositoryResponse<Organisation>> {
    const updatedOrganisation: RepositoryResponse<Organisation> = await this.repositoryService.update(id, updateDto);
    return updatedOrganisation;
  }

  async delete(id: string): Promise<RepositoryResponse<any>> {
    const deletedOrganisation: RepositoryResponse<any> = await this.repositoryService.delete(id);
    return deletedOrganisation;
  }
}

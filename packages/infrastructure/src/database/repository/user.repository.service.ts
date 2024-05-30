import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RepositoryService } from './repository.service';
import { User, UserInput, UserModel } from 'data-model';
import { RepositoryResponse } from 'data-model';

@Injectable()
export class UserRepository {
  private repositoryService: RepositoryService<UserModel>;

  constructor(@InjectModel('User') private userModel: Model<UserModel>) {
    this.repositoryService = new RepositoryService(userModel);
  }

  async findByCriteria({ page, limit, criteria }): Promise<RepositoryResponse<User[]>> {
    const users: RepositoryResponse<User[]> = await this.repositoryService.findByCriteria({ page, limit, criteria });
    return users;
  }

  async findOne(id: string): Promise<RepositoryResponse<User>> {
    const user: RepositoryResponse<User> = await this.repositoryService.findOne(id);
    return user;
  }

  async create(entity: UserInput): Promise<RepositoryResponse<User>> {
    const createdUser: RepositoryResponse<User> = await this.repositoryService.create(entity);
    return createdUser;
  }

  async update(id: string, updateDto: Partial<UserModel>): Promise<RepositoryResponse<User>> {
    const updatedUser: RepositoryResponse<User> = await this.repositoryService.update(id, updateDto);
    return updatedUser;
  }

  async delete(id: string): Promise<RepositoryResponse<any>> {
    const deletedUser: RepositoryResponse<any> = await this.repositoryService.delete(id);
    return deletedUser;
  }
}

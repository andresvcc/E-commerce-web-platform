import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document as MongooseDocument, Model } from 'mongoose';
import { RepositoryResponse, findArgsByCriteria } from 'data-model';

@Injectable()
export class RepositoryService<T extends MongooseDocument> {
  constructor(protected readonly model: Model<T>) {}

  protected getModel(): Model<T> {
    return this.model;
  }

  async findOne(id: string): Promise<RepositoryResponse<any>> {
    try {
      const entity = await this.model.findById(id).exec();
      if (!entity) {
        throw new NotFoundException(`Entity with id ${id} not found`);
      }
      return { status: 'success', data: entity.toObject() };
    } catch (error: any) {
      throw new InternalServerErrorException('Error retrieving entity', error.message);
    }
  }

  async findByCriteria({ page, limit, criteria }: findArgsByCriteria): Promise<RepositoryResponse<any[]>> {
    try {
      const skip = (page - 1) * limit;

      // Transform the criteria to MongoDB format
      const transformedCriteria = Object.entries(criteria).reduce<Record<string, any>>((acc, [key, value]) => {
        const criterionKey = Object.keys(value)[0];

        switch (criterionKey) {
          case 'exact':
            acc[key] = value.exact;
            break;
          case 'between':
            acc[key] = { $gte: value.between[0], $lte: value.between[1] };
            break;
          case 'includes':
            if (Array.isArray(value.includes)) {
              acc[key] = { $in: value.includes };
            } else {
              acc[key] = { $regex: value.includes, $options: 'i' };
            }
            break;
          case 'notIncludes':
            acc[key] = { $nin: value.notIncludes };
            break;
          case 'startsWith':
            acc[key] = { $regex: '^' + value.startsWith, $options: 'i' };
            break;
          case 'endsWith':
            acc[key] = { $regex: value.endsWith + '$', $options: 'i' };
            break;
          case 'hasAttribute':
            acc[value.hasAttribute] = { $exists: true };
            break;
          case 'notHasAttribute':
            acc[value.notHasAttribute] = { $exists: false };
            break;
          case 'not':
            acc[key] = { $ne: value.not };
            break;
          default:
            // You can handle unexpected criteria here if necessary.
            break;
        }
        return acc;
      }, {});

      // Obtener el número total de documentos que coinciden con el criterio
      const totalDocuments = await this.model.countDocuments(transformedCriteria).exec();

      // Calcular el número total de páginas
      const totalPages = Math.ceil(totalDocuments / limit);

      const entities = await this.model.find(transformedCriteria).skip(skip).limit(limit).exec();

      // Devolver las entidades junto con el número total de páginas
      return {
        status: 'success',
        data: entities.map((entity) => ({ ...entity.toObject(), _id: String(entity._id) })),
        totalPages: totalPages,
        page: page,
        limit: limit,
      };
    } catch (error: any) {
      throw new InternalServerErrorException(`Error retrieving entities by criteria ${error.message}`);
    }
  }

  async create(dto: Partial<T>): Promise<RepositoryResponse<any>> {
    try {
      const entity = new this.model(dto);
      const savedEntity = await entity.save();
      return { status: 'success', data: savedEntity.toObject() };
    } catch (error: any) {
      throw new InternalServerErrorException(`Error upserting entity ${error.message}`);
    }
  }

  async update(id: string, dto: Partial<T>): Promise<RepositoryResponse<any>> {
    try {
      const entity = await this.model.findByIdAndUpdate(id, dto, { new: true, upsert: true }).exec();
      return { status: 'success', data: entity.toObject() };
    } catch (error: any) {
      throw new InternalServerErrorException(`Error upserting entity ${error.message}`);
    }
  }

  async delete(id: string): Promise<RepositoryResponse<any>> {
    try {
      const entity = await this.model.findByIdAndRemove(id).exec();
      if (!entity) {
        throw new NotFoundException(`Entity with id ${id} not found`);
      }
      return { status: 'success', data: entity.toObject() };
    } catch (error: any) {
      throw new InternalServerErrorException(`Error deleting entity ${error.message}`);
    }
  }
}

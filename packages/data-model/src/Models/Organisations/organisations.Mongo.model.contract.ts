import { Document as MongooseDocument, Schema, Model, model } from 'mongoose';
import { Token } from '../Token';
import { OrganisationSchema } from './organisations.Mongo.schema.contract';
import { OrganisationStatus } from './organisations.status.type';

// The UserModel interface extends MongooseDocument for type safety and defines the required fields for a user document in MongoDB; additional non-specified fields can be included in the actual MongoDB documents.
export interface OrganisationModel extends MongooseDocument {
  name: string;
  address?: string;
  telephone?: string;
  logo?: string;
  status: OrganisationStatus;
}

export const OrganisationModel: Model<OrganisationModel> = model<OrganisationModel>('Organisation', OrganisationSchema);

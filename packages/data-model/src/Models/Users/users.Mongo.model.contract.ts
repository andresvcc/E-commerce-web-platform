import { Document as MongooseDocument, Schema, Model, model } from 'mongoose';
import { UserStatus } from './users.status.type';
import { UserSchema } from './users.Mongo.schema.contract';
import { UserRights } from './users.rights.type';
import { Supervisor } from './users.supervisor.type';
import { Token } from '../Token';
import { Membership } from './users.membre.type';

// The UserModel interface extends MongooseDocument for type safety and defines the required fields for a user document in MongoDB; additional non-specified fields can be included in the actual MongoDB documents.
export interface UserModel extends MongooseDocument {
  username: string;
  email?: string;
  token?: Token;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: String;
  rights: UserRights[];
  status: UserStatus;
  supervisors: Supervisor[];
  memberships: Membership[];
}

export const UserModel: Model<UserModel> = model<UserModel>('User', UserSchema);

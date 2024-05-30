import { Document as MongooseDocument, Schema, Model, model } from 'mongoose';
import { UserRights } from './users.rights.type';
import { UserStatus } from './users.status.type';
import { SupervisorPermissions } from './users.supervisor.type';
import { UserRole } from './users.membre.type';

// The UserSchema defines the MongoDB schema for a user, with all potential fields that are to be stored in the database, according to the types defined.
export const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: false },
  token: {
    type: {
      uuid: { type: String, required: true },
      value: { type: String, required: true },
      createAt: { type: Date, required: true },
    },
    required: false,
  },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  dateOfBirth: { type: Date, required: false },
  status: {
    type: String,
    required: true,
    enum: Object.values(UserStatus), // Esto restringirá los valores a los definidos en la enumeración
  },
  rights: {
    type: [{ type: String, enum: Object.values(UserRights) }], // Array de UserRights como strings
    required: true,
  },
  supervisors: {
    type: [
      {
        _id: { type: String, required: true },
        oversightStartDate: { type: Date, required: true },
        oversightEndDate: { type: Date, required: true },
        supervisorPermissions: {
          type: [{ type: String, enum: Object.values(SupervisorPermissions) }],
          required: true,
        },
      },
    ],
    required: true,
  },
  memberships: {
    type: [
      {
        _id: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: false },
        role: { type: String, required: true, enum: Object.values(UserRole) },
      },
    ],
    required: true,
  },
});

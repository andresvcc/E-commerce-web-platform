import { Document as MongooseDocument, Schema, Model, model } from 'mongoose';
import { Token } from '../Token';
import { OrganisationStatus } from './organisations.status.type';

// The OrganisationSchema defines the MongoDB schema for a organisation, with all potential fields that are to be stored in the database, according to the types defined.
export const OrganisationSchema: Schema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: false },
  telephone: { type: String, required: false },
  logo: { type: String, required: false },
  status: {
    type: String,
    required: true,
    enum: Object.values(OrganisationStatus), // Esto restringirá los valores a los definidos en la enumeración
  },
});

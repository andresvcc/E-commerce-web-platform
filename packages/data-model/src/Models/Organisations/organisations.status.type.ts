import { registerEnumType } from '@nestjs/graphql';

export enum OrganisationStatus {
  Pending_Verification = 'Pending_Verification',
  Active = 'Active',
  Inactive = 'Inactive',
  Suspended = 'Suspended',
  Deleted = 'Deleted',
  Banned = 'Banned',
  First_Use_Pending = 'First_Use_Pending',
}

registerEnumType(OrganisationStatus, {
  name: 'OrganisationStatus', // Esto es lo que GraphQL usará como nombre para el tipo de enumeración.
  description: 'The status of organisation in the system',
});

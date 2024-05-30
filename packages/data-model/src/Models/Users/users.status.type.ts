import { registerEnumType } from '@nestjs/graphql';

export enum UserStatus {
  Pending_Verification = 'Pending_Verification',
  Active = 'Active',
  Inactive = 'Inactive',
  Suspended = 'Suspended',
  Deleted = 'Deleted',
  Banned = 'Banned',
  First_Login_Pending = 'First_Login_Pending',
}

registerEnumType(UserStatus, {
  name: 'UserStatus', // Esto es lo que GraphQL usará como nombre para el tipo de enumeración.
  description: 'The status of users in the system',
});

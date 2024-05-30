import { registerEnumType } from '@nestjs/graphql';

export enum UserRights {
  Admin = 'Admin',
  User = 'User',
  Visitor = 'Visitor',
  Developer = 'Developer',
}

registerEnumType(UserRights, {
  name: 'UserRights', // Esto es lo que GraphQL usará como nombre para el tipo de enumeración.
  description: 'The rights of users in the system',
});

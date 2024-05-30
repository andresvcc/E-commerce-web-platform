import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { registerEnumType } from '@nestjs/graphql';

export enum SupervisorPermissions {
  Evaluate = 'Evaluate', // Evaluate students
  AssignActivities = 'AssignActivities', // Assign activities
  ModifyStudentData = 'ModifyStudentData', // Modify student data profile
  CommunicateWithStudent = 'CommunicateWithStudent', // Communicate with student by chat
  AccessAcademicReports = 'AccessAcademicReports', // Access to academic reports
  ManageAttendance = 'ManageAttendance', // Edit attendance records
  PlanCurriculum = 'PlanCurriculum', // planify the curriculum for the students
  ViewProgressReports = 'ViewProgressReports', // View progress reports
  CustomizeLearningPaths = 'CustomizeLearningPaths', // Customize learning paths
}

registerEnumType(SupervisorPermissions, {
  name: 'SupervisorPermissions', // this param is what GraphQL will use as the name for the enum type
  description: 'The available permissions for a supervisor', // this will be the description in the GraphQL schema
});

@ObjectType()
export class Supervisor {
  @Field(() => String, { description: 'Supervisor _id' })
  readonly _id: string;

  @Field(() => String, { description: 'oversightStartDate' })
  readonly oversightStartDate: String;

  @Field(() => String, { description: 'oversightEndDate' })
  readonly oversightEndDate: String;

  @Field(() => [SupervisorPermissions], { description: 'supervisorPermissions' })
  readonly supervisorPermissions: SupervisorPermissions[];
}

@InputType()
export class SupervisorInput {
  @Field(() => String, { description: 'Supervisor _id' })
  readonly _id: string;

  @Field(() => String, { description: 'oversightStartDate' })
  readonly oversightStartDate: String;

  @Field(() => String, { description: 'oversightEndDate' })
  readonly oversightEndDate: String;

  @Field(() => [SupervisorPermissions], { description: 'supervisorPermissions' })
  readonly supervisorPermissions: SupervisorPermissions[];
}

import { Field, InputType } from '@nestjs/graphql';
import { DataValidator } from 'src/DataValidator';

@InputType()
export class UserAuth {
  @Field(() => String, { description: 'User name' })
  readonly username: string;

  @Field(() => String, { description: 'Password' })
  readonly password: string;
}

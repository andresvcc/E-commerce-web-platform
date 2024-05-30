import { ObjectType, Field, InputType, registerEnumType } from '@nestjs/graphql';
import { DataValidator, Dto } from '../../DataValidator';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';

export enum TokenTypes {
  JWT = 'JWT',
  HASH = 'HASH',
}

registerEnumType(TokenTypes, {
  name: 'TokenTypes', // Esto es lo que GraphQL usará como nombre para el tipo de enumeración.
  description: 'The status of users in the system',
});

export class TokenDto {
  @Dto({ type: 'string', required: true })
  uuid: string;

  @Dto({ type: 'string', required: false })
  createAt?: string | null;

  @Dto({ type: 'string', required: true })
  value: string;
}

@ObjectType()
export class Token {
  @Dto({ type: 'string', required: true })
  @Field(() => String, { description: 'Id' })
  uuid: string;

  @Dto({ type: 'string', required: false })
  @Field(() => String, { nullable: true, description: 'createAt' })
  createAt?: string | null;

  @Dto({ type: 'string', required: true })
  @Field(() => String, { description: 'Value' })
  value: string;

  @Dto({ type: 'string', required: false })
  @Field(() => TokenTypes, { nullable: true, description: 'Value' })
  type: TokenTypes | null;

  constructor(hash: string, type: TokenTypes = TokenTypes.HASH) {
    this.uuid = v4();
    this.createAt = new Date().toISOString();
    this.value = hash;
    this.type = type;
  }

  public static async createByPassword(password: string): Promise<Token> {
    const hashPassword: string = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hashCode) => {
        if (err) {
          return reject(err);
        }
        resolve(hashCode);
      });
    });

    return new Token(hashPassword, TokenTypes.HASH);
  }

  public static async createByJwt(object: any): Promise<Token> {
    return new Token(object, TokenTypes.JWT);
  }

  public static async hashCompare(token: Token, password: string): Promise<boolean> {
    const hashCode = token.value;

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hashCode, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }
}

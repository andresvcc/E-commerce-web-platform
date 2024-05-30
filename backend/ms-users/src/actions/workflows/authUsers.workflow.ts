/* eslint-disable @typescript-eslint/no-unused-vars */
import { SagaFactory } from 'helpers';
import { User, Result, findUsersByCriteria, Token, UserAuth } from 'data-model';

export async function workflowAuthUser({
  find,
  userAuthParams,
  generateJwt,
}: {
  find: findUsersByCriteria;
  userAuthParams: UserAuth;
  generateJwt: (payload: any) => Promise<string>;
}): Promise<Result<Token>> {
  const authUserSaga = new SagaFactory<{
    userAuthParams?: UserAuth;
    token?: Token;
    user?: User;
  }>({
    userAuthParams,
  })

    // find users by criteria in database
    .step('Find users by criteria')
    .invoke(async (ctx) => {
      const { status, data } = await find({
        page: 1,
        limit: 1,
        criteria: {
          username: { exact: userAuthParams.username },
        },
      });

      return {
        ...ctx,
        user: data[0],
        dbQueryStatus: status,
      };
    })
    .verify('dbResponse exist?', (ctx) => Boolean(ctx.user))
    .verify('db query id success?', (ctx) => ctx.dbQueryStatus === 'success')

    .step('Valid password')
    .invoke(async (ctx) => {
      const { user, userAuthParams } = ctx;

      const { token } = user;

      const isPasswordValid = await Token.hashCompare(token, userAuthParams.password);

      return { ...ctx, isPasswordValid };
    })
    .verify('isPasswordValid?', (ctx) => ctx.isPasswordValid, 'AUTH_FAIL')
    .compensation(async (ctx, errors, history) => {
      throw new Error('PASSWORD_INVALID: Invalid password');
    })

    .step('Create JWT token')
    .invoke(async (ctx) => {
      const { user } = ctx;

      const jwt = await generateJwt({
        _id: user._id,
        username: user.username,
        email: user.email,
        rights: user.rights,
        supervisor: user.supervisor,
        status: user.status,
      });

      const token: Token = await Token.createByJwt(jwt);
      return { ...ctx, token };
    })
    .execute();

  const {
    context: { token },
    errors,
  } = await authUserSaga;

  return Result.from<Token>({ errors, value: token });
}

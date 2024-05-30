/* eslint-disable @typescript-eslint/no-unused-vars */
import { SagaFactory } from 'helpers';
import { User, UserInput, Result, RepositoryResponse } from 'data-model';

export async function workflowCreateUser({
  create,
  userInputparams,
}: {
  create: (entity: UserInput) => Promise<RepositoryResponse<User>>;
  userInputparams: UserInput;
}): Promise<Result<User>> {
  const upsertUserSaga = new SagaFactory<{
    userInputparams: UserInput;
    userInput?: UserInput;
    userResult?: User;
    objectIsValid?: boolean;
    uuidIsValid?: boolean;
    isValid?: boolean;
    userResultIsValid?: boolean;
  }>({ userInputparams })

    // Checks the integrity of the object to be stored in the database
    .step('ValidateUserSpecification')
    .invoke(async (ctx) => {
      const userInput = await UserInput.create(ctx.userInputparams);
      return { ...ctx, userInput };
    })
    .compensation(async (ctx, errors, history) => {
      throw new Error('COMPENSATE_ERROR:Failed to create user value object');
    })

    // Creates a user in database if it does not exist
    .step('CreateUser')
    .invoke(async (ctx) => {
      const { data, status } = await create(ctx.userInput);
      return {
        ...ctx,
        dbResponse: data,
        dbQueryStatus: status,
      };
    })
    .verify('dbResponse exist', (ctx) => Boolean(ctx.dbResponse))
    .verify('db query success', (ctx) => ctx.dbQueryStatus === 'success')
    .compensation(async (ctx, errors, history) => {
      throw new Error('REPOSITORY_ERROR:Failed to create user');
    })

    // Checks that the object received by the database is a user with valid attributes
    .step('EnsureRegularUserIntegrity')
    .condition((ctx) => ctx.userInputparams.visitor === false)
    .invoke(async (ctx) => {
      const userResult = User.create(ctx.dbResponse);
      return { ...ctx, userResult };
    })
    .verify('userResult exist', (ctx) => Boolean(ctx.userResult))
    .compensation(async (ctx, errors, history) => {
      throw new Error('INTEGRITY_ERROR:Failed to create regular user value object');
    })

    // Checks that the object received by the database is a visitor with valid attributes
    .step('EnsureVisitorIntegrity')
    .condition((ctx) => ctx.userInputparams.visitor === true)
    .invoke(async (ctx) => {
      const userResult = User.create(ctx.dbResponse);
      return { ...ctx, userResult };
    })
    .verify('userResult exist', (ctx) => Boolean(ctx.userResult))
    .compensation(async (ctx, errors, history) => {
      throw new Error('INTEGRITY_ERROR:Failed to create visitor user value object');
    })

    .execute();

  const {
    context: { userResult },
    errors,
  } = await upsertUserSaga;

  return Result.from<User>({ errors, value: userResult });
}

import { SagaFactory } from 'helpers';
import { User, Result, UsersArgs, Criterias, findUsersByCriteria } from 'data-model';

export async function workflowFindUser({
  find,
  findArgs,
}: {
  find: findUsersByCriteria;
  findArgs: UsersArgs;
}): Promise<Result<User[]>> {
  const { page, limit, ...criteria } = findArgs;

  const findUserSaga = new SagaFactory<{
    page: number;
    limit: number;
    criteria: Criterias;
    usersResult?: User[];
    dbResponse?: {
      data: User[];
      totalPages: number;
      page: number;
      limit: number;
    };
  }>({
    page,
    limit,
    criteria: criteria,
  })
    // find users by criteria in database
    .step('Find users by criteria')
    .invoke(async (ctx) => {
      const { status, data, totalPages, page, limit } = await find({
        page: ctx.page,
        limit: ctx.limit,
        criteria: ctx.criteria,
      });
      return {
        ...ctx,
        dbResponse: {
          data,
          totalPages,
          page,
          limit,
        },
        dbQueryStatus: status,
      };
    })
    .verify('dbResponse exist?', (ctx) => Boolean(ctx.dbResponse))
    .verify('db query id success?', (ctx) => ctx.dbQueryStatus === 'success')
    .compensation(async (ctx, errors, history) => {
      this.msCommunication.emit('health-checker:disaster', {
        error: 'ms-user:Failed to fetch users',
      });
    })
    // even if the database returns an error we do not want to rollback,
    .skipRollback()

    // filter and retain only valid users
    .step('Filter and retain only valid users')
    .invoke(async (ctx) => {
      const validUsers = ctx.dbResponse?.data.map((user: User) => User.create(user)) || [];
      return {
        ...ctx,
        usersResult: validUsers,
        totalPages: ctx.dbResponse?.totalPages,
      };
    })
    .compensation(async (ctx, errors, history) => {
      console.log('ERROR in Filter and retain only valid users:', { errors, history });
    })
    .execute();

  const {
    context: { usersResult, dbResponse },
    errors,
  } = await findUserSaga;

  return Result.from<User[]>({
    errors,
    value: usersResult || [],
    totalPages: dbResponse?.totalPages,
    limits: dbResponse?.limit,
    page: dbResponse?.page,
  });
}

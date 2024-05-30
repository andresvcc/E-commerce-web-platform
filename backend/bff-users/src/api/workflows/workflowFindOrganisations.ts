import { SagaFactory } from 'helpers';
import {
  User,
  UserInput,
  Result,
  RepositoryResponse,
  Organisation,
  OrganisationsArgs,
} from 'data-model';
import { IMSCommunication } from 'infrastructure';

export async function workflowFindOrganisations({
  userId,
  msCommunication,
}: {
  userId: string;
  msCommunication: IMSCommunication;
}): Promise<Result<Organisation[]>> {
  const organisationsByUserSaga = new SagaFactory<{
    userId: string;
    user?: User;
    organisations?: Organisation[];
  }>({ userId })

    // Checks the integrity of the object to be stored in the database
    .step('get memberships')
    .invoke(async (ctx) => {
      const { errors, result }: Result<User[]> = await msCommunication.send(
        'ms-users:find',
        {
          args: {
            _id: userId,
            page: 1,
            limit: 1,
          },
        },
      );

      if (errors) {
        throw new Error(errors[0]);
      }

      const { memberships } = User.create(result[0]);
      return { ...ctx, memberships };
    })
    .verify(
      'Memberships exist?',
      (ctx) => Boolean(ctx.memberships),
      'SAGA_VERIFICATION_FAIL:USER_NOT_FOUND',
    )
    .compensation(async (ctx, errors, history) => {
      throw new Error('ms-users:Failed to fetch user');
    })

    .step('get organisations')
    .invoke(async (ctx) => {
      const { errors, result }: Result<Organisation[]> =
        await msCommunication.send('ms-organisations:find', {
          args: {
            _id: { includes: ctx.memberships.map(({ _id }) => _id) },
            page: 1,
            limit: 100,
          },
        });

      if (errors) {
        throw new Error(errors[0]);
      }

      const organisations = result.map((organisation) =>
        Organisation.create(organisation),
      );

      return { ...ctx, organisations };
    })

    .execute();

  const {
    context: { organisations },
    errors,
  } = await organisationsByUserSaga;

  return Result.from<Organisation[]>({ errors, value: organisations });
}

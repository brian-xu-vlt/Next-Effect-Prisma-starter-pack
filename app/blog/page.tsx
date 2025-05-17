import { Effect, pipe } from 'effect';
import { UserManager, UserManagerLayerLive } from 'modules/domain/user-manager';
import { appRunPromise } from 'modules/infrastructure/runtime';

export default async function Blog() {
  const users = await appRunPromise(
    pipe(
      UserManager,
      Effect.andThen(_ => _.fetchAll()),
      Effect.provide(UserManagerLayerLive),
    ),
  );

  return (
    <div>
      <h1>Blog</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}

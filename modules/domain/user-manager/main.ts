import { Effect, Layer } from 'effect';
import { UserManagerError } from 'modules/domain/user-manager/error';
import { UserManager } from 'modules/domain/user-manager/interface';
import { UserRepository } from 'modules/domain/user-manager/repositories/user.interface';

export const UserManagerLayer = Layer.effect(
  UserManager,
  Effect.gen(function* () {
    const userRepository = yield* UserRepository;

    const fetchAll: UserManager['fetchAll'] = () =>
      userRepository.fetchAll().pipe(
        Effect.catchAll(
          error =>
            new UserManagerError({
              error,
              message: 'Unable to fetch all users',
            }),
        ),
        Effect.withSpan('UserManager.fetchAll'),
      );

    testError: return UserManager.of({
      fetchAll,
    });
  }),
);

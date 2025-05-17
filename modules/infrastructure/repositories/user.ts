import { Effect, Layer } from 'effect';
import {
  UserRepository,
  UserRepositoryError,
} from 'modules/domain/user-manager/repositories/user.interface';
import { PrismaClientLayerLive } from 'modules/infrastructure/database/prisma-client';
import { PrismaClient } from 'modules/infrastructure/database/prisma-client/interface';

export const UserRepositoryLayer = Layer.effect(
  UserRepository,
  Effect.gen(function* () {
    const prismaClient = yield* PrismaClient;

    const fetchAll: UserRepository['fetchAll'] = () =>
      prismaClient
        .wrap(_ => _.user.findMany())
        .pipe(
          Effect.catchAll(
            error =>
              new UserRepositoryError({
                error,
                message: 'Unable to fetch all users',
              }),
          ),
          Effect.withSpan('UserRepository.fetchAll'),
        );

    return UserRepository.of({
      fetchAll,
    });
  }),
);

export const UserRepositoryLayerLive = UserRepositoryLayer.pipe(
  Layer.provide(PrismaClientLayerLive),
);

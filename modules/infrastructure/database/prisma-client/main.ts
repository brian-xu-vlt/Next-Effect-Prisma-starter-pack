import { Effect, Layer } from 'effect';
import { PrismaClientError } from 'modules/infrastructure/database/prisma-client/error';
import { PrismaClient } from 'modules/infrastructure/database/prisma-client/interface';
import { Prisma } from 'modules/infrastructure/database/prisma-client/layers/prisma';

export const make = Effect.gen(function* () {
  const prisma = yield* Prisma;

  const wrap = <T>(fn: (prisma: Prisma) => Promise<T>) =>
    Effect.tryPromise({
      try: () => fn(prisma),
      catch: (error: unknown) =>
        new PrismaClientError({
          error: error as Error,
          message: (error as Error).message,
        }),
    }).pipe(Effect.withSpan('PrismaClient.wrap'));

  return {
    wrap,
  };
});

export const PrismaClientLayer = Layer.effect(PrismaClient, make);

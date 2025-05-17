import { Effect, pipe } from 'effect';
import {
  Prisma,
  PrismaLayerLive,
} from 'modules/infrastructure/database/prisma-client/layers/prisma';

export * from 'modules/infrastructure/database/prisma-client/live';

export const getPrisma = () =>
  pipe(Prisma, Effect.provide(PrismaLayerLive), Effect.runSync);

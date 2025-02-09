import {
    PrismaLayerLive,
    Prisma,
} from 'modules/infrastructure/database/prisma-client/layers/prisma'
import { pipe, Effect } from 'effect'

export * from 'modules/infrastructure/database/prisma-client/live'

export const getPrisma = () =>
    pipe(Prisma, Effect.provide(PrismaLayerLive), Effect.runSync)

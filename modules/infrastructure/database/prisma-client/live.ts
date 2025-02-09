import { PrismaClientLayer } from 'modules/infrastructure/database/prisma-client/main'
import { Layer } from 'effect'
import { PrismaLayerLive } from 'modules/infrastructure/database/prisma-client/layers/prisma'

export const PrismaClientLayerLive = PrismaClientLayer.pipe(
    Layer.provide(PrismaLayerLive),
)

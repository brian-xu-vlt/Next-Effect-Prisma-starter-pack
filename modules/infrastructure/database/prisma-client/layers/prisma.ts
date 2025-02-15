import { PrismaClient } from '@prisma/client'
import { Context, Effect, Layer } from 'effect'

export const ErrorIdPrismaClientError = 'PrismaClientError'

const createPrisma = () => {
   const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
   const prisma = globalForPrisma.prisma || new PrismaClient()

   if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

   return prisma
}

export type Prisma = ReturnType<typeof createPrisma>
export const Prisma = Context.GenericTag<Prisma>('prisma')

export const PrismaLayer = Layer.effect(
   Prisma,
   Effect.gen(function* () {
      return createPrisma()
   })
)

export const PrismaLayerLive = PrismaLayer

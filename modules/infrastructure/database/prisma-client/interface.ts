import { Context, Effect } from 'effect';
import { make } from 'modules/infrastructure/database/prisma-client/main';

export interface PrismaClient extends Effect.Effect.Success<typeof make> {}
export const PrismaClient = Context.GenericTag<PrismaClient>('prisma-client');

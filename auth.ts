import { PrismaAdapter } from '@auth/prisma-adapter';
import { authOptions } from 'modules/infrastructure/auth-manager/next-auth';
import { getPrisma } from 'modules/infrastructure/database/prisma-client';
import NextAuth from 'next-auth';

const prisma = getPrisma();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authOptions,
});

import NextAuth from 'next-auth'
import { authOptions } from 'modules/infrastructure/auth-manager/next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { getPrisma } from 'modules/infrastructure/database/prisma-client'

const prisma = getPrisma()

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    callbacks: {
        session: ({ session }) => {
            console.log({ session })
            return session
        },
    },
    ...authOptions,
})

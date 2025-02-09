import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { AppRouter } from 'server'

const handler = (req: Request) =>
   fetchRequestHandler({
      endpoint: '/api/trpc',
      req,
      router: AppRouter,
      createContext: () => ({}),
   })

export { handler as GET, handler as POST }

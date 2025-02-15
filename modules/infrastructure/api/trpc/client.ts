import { createTRPCReact } from '@trpc/react-query'
import { AppRouter } from 'modules/infrastructure/api/trpc/routes'

export const trpc = createTRPCReact<AppRouter>({})

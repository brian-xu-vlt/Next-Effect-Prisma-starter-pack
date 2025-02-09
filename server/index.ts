import { router } from 'server/trpc'
import { testRouter } from 'server/routers/test'

export const AppRouter = router({
   test: testRouter,
})

export type AppRouter = typeof AppRouter

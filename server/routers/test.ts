import { publicProcedure, router } from 'server/trpc'
import { Effect, pipe } from 'effect'
import { UserManager, UserManagerLayerLive } from 'modules/domain/user-manager'
import { appRunPromiseWithLayer } from 'modules/infrastructure/runtime'

export const testRouter = router({
    hello: publicProcedure.query(() => {
        return [{ text: 'Hello, world!' }]
    }),
    getUsers: publicProcedure.query(async () =>
        pipe(
            UserManager,
            Effect.andThen(_ => _.fetchAll()),
            appRunPromiseWithLayer(UserManagerLayerLive),
        ),
    ),
})

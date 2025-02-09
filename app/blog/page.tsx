// 'use-client'

// import { trpc } from 'server/client'
import { pipe, Effect } from 'effect'
import { appRunPromise } from 'modules/infrastructure/runtime'
import { UserManager, UserManagerLayerLive } from 'modules/domain/user-manager'

export default async function Blog() {
    // const { data } = trpc.test.getUsers.useQuery()
    const users = await appRunPromise(
        pipe(
            UserManager,
            Effect.andThen(_ => _.fetchAll()),
            Effect.provide(UserManagerLayerLive),   
        ),
    )

    return (
        <div>
            <h1>Blog</h1>
            <pre>{JSON.stringify(users, null, 2)}</pre>
        </div>
    )
}

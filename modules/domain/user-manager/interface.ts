import { Effect, Context } from 'effect'
import { User } from 'modules/domain/user-manager/entities'
import { UserManagerError } from 'modules/domain/user-manager/error'

export type UserManager = {
    fetchAll: () => Effect.Effect<User[], UserManagerError>
}

export const UserManager = Context.GenericTag<UserManager>('user-manager')

import { Effect, Context } from 'effect'
import { User } from 'modules/domain/user-manager/entities'
import { EffectError } from 'lib/effect/error'

export class UserRepositoryError extends EffectError('UserRepositoryError') {}

export type UserRepository = {
    fetchAll: () => Effect.Effect<User[], UserRepositoryError>
}

export const UserRepository = Context.GenericTag<UserRepository>('user-repository')

import { Context, Effect } from 'effect';
import { EffectError } from 'lib/effect/error';
import { User } from 'modules/domain/user-manager/entities';

export class UserRepositoryError extends EffectError('UserRepositoryError') {}

export type UserRepository = {
  fetchAll: () => Effect.Effect<User[], UserRepositoryError>;
};

export const UserRepository =
  Context.GenericTag<UserRepository>('user-repository');

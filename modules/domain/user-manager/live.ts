import { Layer } from 'effect';
import { UserManagerLayer } from 'modules/domain/user-manager/main';
import { UserRepositoryLayerLive } from 'modules/infrastructure/repositories/user';

export const UserManagerLayerLive = UserManagerLayer.pipe(
  Layer.provide(UserRepositoryLayerLive),
);

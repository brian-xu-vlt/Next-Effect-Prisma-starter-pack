import { Layer } from 'effect';
import { CaseManagementLayer } from 'modules/domain/case-management/main';
import { CaseRepositoryLayer } from 'modules/infrastructure/repositories/case';

export const CaseManagementLayerLive = CaseManagementLayer.pipe(
    Layer.provide(CaseRepositoryLayer),
);

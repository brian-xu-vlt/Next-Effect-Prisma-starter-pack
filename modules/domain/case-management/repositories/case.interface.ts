import { Context, type Effect } from 'effect';
import { EffectError } from 'lib/effect/error';
import type { Case } from 'modules/domain/case-management/entities';

export class CaseRepositoryError extends EffectError('CaseRepositoryError') { }

export type CaseRepository = {
    fetchAll: () => Effect.Effect<Case[], CaseRepositoryError>;
    fetchById: (id: string) => Effect.Effect<Case, CaseRepositoryError>;
    create: (
        caseData: Omit<Case, 'id' | 'createdAt' | 'updatedAt'>,
    ) => Effect.Effect<Case, CaseRepositoryError>;
    update: (
        id: string,
        caseData: Partial<Omit<Case, 'id' | 'createdAt' | 'updatedAt'>>,
    ) => Effect.Effect<Case, CaseRepositoryError>;
};

export const CaseRepository =
    Context.GenericTag<CaseRepository>('case-repository');

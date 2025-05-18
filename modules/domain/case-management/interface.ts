import { Context, type Effect } from 'effect';
import type { Case } from 'modules/domain/case-management/entities';
import type { CaseManagementError } from 'modules/domain/case-management/error';

export type CaseManagement = {
    fetchAll: () => Effect.Effect<Case[], CaseManagementError>;
    fetchById: (id: string) => Effect.Effect<Case, CaseManagementError>;
    create: (
        caseData: Omit<Case, 'id' | 'createdAt' | 'updatedAt'>,
    ) => Effect.Effect<Case, CaseManagementError>;
    update: (
        id: string,
        caseData: Partial<Omit<Case, 'id' | 'createdAt' | 'updatedAt'>>,
    ) => Effect.Effect<Case, CaseManagementError>;
    updateStatus: (
        id: string,
        status: Case['status'],
    ) => Effect.Effect<Case, CaseManagementError>;
    assignCase: (
        id: string,
        userId: string | null,
    ) => Effect.Effect<Case, CaseManagementError>;
};

export const CaseManagement =
    Context.GenericTag<CaseManagement>('case-management');

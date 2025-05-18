import { Effect, Layer } from 'effect';
import { CaseManagementError } from 'modules/domain/case-management/error';
import { CaseManagement } from 'modules/domain/case-management/interface';
import { CaseRepository } from 'modules/domain/case-management/repositories/case.interface';

export const CaseManagementLayer = Layer.effect(
    CaseManagement,
    Effect.gen(function* () {
        const caseRepository = yield* CaseRepository;

        const fetchAll: CaseManagement['fetchAll'] = () =>
            caseRepository.fetchAll().pipe(
                Effect.catchAll(
                    error =>
                        Effect.fail(
                            new CaseManagementError({
                                error,
                                message: 'Unable to fetch all cases',
                            }),
                        ),
                ),
                Effect.withSpan('CaseManagement.fetchAll'),
            );

        const fetchById: CaseManagement['fetchById'] = (id) =>
            caseRepository.fetchById(id).pipe(
                Effect.catchAll(
                    error =>
                        Effect.fail(
                            new CaseManagementError({
                                error,
                                message: `Unable to fetch case with id: ${id}`,
                            }),
                        ),
                ),
                Effect.withSpan('CaseManagement.fetchById'),
            );

        const create: CaseManagement['create'] = (caseData) =>
            caseRepository.create(caseData).pipe(
                Effect.catchAll(
                    error =>
                        Effect.fail(
                            new CaseManagementError({
                                error,
                                message: 'Unable to create case',
                            }),
                        ),
                ),
                Effect.withSpan('CaseManagement.create'),
            );

        const update: CaseManagement['update'] = (id, caseData) =>
            caseRepository.update(id, caseData).pipe(
                Effect.catchAll(
                    error =>
                        Effect.fail(
                            new CaseManagementError({
                                error,
                                message: `Unable to update case with id: ${id}`,
                            }),
                        ),
                ),
                Effect.withSpan('CaseManagement.update'),
            );

        const updateStatus: CaseManagement['updateStatus'] = (id, status) =>
            caseRepository.update(id, { status }).pipe(
                Effect.catchAll(
                    error =>
                        Effect.fail(
                            new CaseManagementError({
                                error,
                                message: `Unable to update status for case with id: ${id}`,
                            }),
                        ),
                ),
                Effect.withSpan('CaseManagement.updateStatus'),
            );

        const assignCase: CaseManagement['assignCase'] = (id, userId) =>
            caseRepository.update(id, { assignedTo: userId }).pipe(
                Effect.catchAll(
                    error =>
                        Effect.fail(
                            new CaseManagementError({
                                error,
                                message: `Unable to assign case with id: ${id}`,
                            }),
                        ),
                ),
                Effect.withSpan('CaseManagement.assignCase'),
            );

        return CaseManagement.of({
            fetchAll,
            fetchById,
            create,
            update,
            updateStatus,
            assignCase,
        });
    }),
);

import { Effect, Layer } from 'effect';
import {
    CaseRepository,
    CaseRepositoryError,
} from 'modules/domain/case-management/repositories/case.interface';
import { PrismaClientLayerLive } from 'modules/infrastructure/database/prisma-client';
import { PrismaClient } from 'modules/infrastructure/database/prisma-client/interface';

export const CaseRepositoryLayer = Layer.effect(
    CaseRepository,
    Effect.gen(function* () {
        const prismaClient = yield* PrismaClient;

        const fetchAll: CaseRepository['fetchAll'] = () =>
            prismaClient
                .wrap(_ => _.case.findMany())
                .pipe(
                    Effect.catchAll(
                        error =>
                            Effect.fail(
                                new CaseRepositoryError({
                                    error,
                                    message: 'Unable to fetch all cases',
                                }),
                            ),
                    ),
                    Effect.withSpan('CaseRepository.fetchAll'),
                );

        const fetchById: CaseRepository['fetchById'] = (id) =>
            prismaClient
                .wrap(_ => _.case.findUniqueOrThrow({
                    where: { id },
                }))
                .pipe(
                    Effect.catchAll(
                        error =>
                            Effect.fail(
                                new CaseRepositoryError({
                                    error,
                                    message: `Unable to fetch case with id: ${id}`,
                                }),
                            ),
                    ),
                    Effect.withSpan('CaseRepository.fetchById'),
                );

        const create: CaseRepository['create'] = (caseData) =>
            prismaClient
                .wrap(_ => _.case.create({
                    data: caseData,
                }))
                .pipe(
                    Effect.catchAll(
                        error =>
                            Effect.fail(
                                new CaseRepositoryError({
                                    error,
                                    message: 'Unable to create case',
                                }),
                            ),
                    ),
                    Effect.withSpan('CaseRepository.create'),
                );

        const update: CaseRepository['update'] = (id, caseData) =>
            prismaClient
                .wrap(_ => _.case.update({
                    where: { id },
                    data: caseData,
                }))
                .pipe(
                    Effect.catchAll(
                        error =>
                            Effect.fail(
                                new CaseRepositoryError({
                                    error,
                                    message: `Unable to update case with id: ${id}`,
                                }),
                            ),
                    ),
                    Effect.withSpan('CaseRepository.update'),
                );

        return CaseRepository.of({
            fetchAll,
            fetchById,
            create,
            update,
        });
    }),
);

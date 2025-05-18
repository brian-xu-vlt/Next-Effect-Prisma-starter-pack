export type Case = {
    id: string;
    title: string;
    description: string;
    status: CaseStatus;
    assignedTo: string | null;
    createdAt: Date;
    updatedAt: Date;
};

export enum CaseStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    RESOLVED = 'RESOLVED',
    CLOSED = 'CLOSED',
}

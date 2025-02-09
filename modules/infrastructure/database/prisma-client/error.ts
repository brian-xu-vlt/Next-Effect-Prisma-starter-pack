import { Data } from 'effect'

export class PrismaClientError extends Data.TaggedError('PrismaClientError')<{
   error: Error
   message: string
}> {}


import { Data, Effect } from 'effect'

type ErrorType = Error | null | unknown
export type EffectErrorArgs = {
    message: string
    error: ErrorType
    friendlyMessage?: string
}

export const EffectError = <Tag extends string>(tag: Tag) => {
    return class _InternalEffectError extends Data.TaggedError(tag)<EffectErrorArgs> {
        public readonly message: string
        public readonly error: ErrorType
        public readonly friendlyMessage?: string
        constructor(args: EffectErrorArgs) {
            super(args)
            this.message = args.message
            this.error = args.error
            this.friendlyMessage = args.friendlyMessage
        }
    }
}

export function interpretError(err: ErrorType): string {
    if (!err) return ''
    if (err instanceof Error) {
        return err.stack ?? err.message
    } else if (typeof err === 'object') {
        return JSON.stringify(err)
    } else {
        return String(err)
    }
}

export type ReplaceEffectError<T, K> = T extends Effect.Effect<infer R, never, infer W>
    ? Effect.Effect<R, never, W>
    : T extends Effect.Effect<infer R, any, infer W>
    ? Effect.Effect<R, K, W>
    : T

import { Logger, Effect, Cause, HashMap, Chunk } from 'effect'

export function extractMessageAndExtra(message: unknown): {
    message: string
    extra: Record<string, unknown>
} {
    const defaultMessage = '[my-app] Message was not provided'

    if (typeof message === 'string') {
        return {
            message,
            extra: {},
        }
    }

    if (Array.isArray(message)) {
        const messagesWithExtras = message.map(extractMessageAndExtra)
        return {
            message: messagesWithExtras.map(m => m.message).join(' '),
            extra: messagesWithExtras
                .map(m => m.extra)
                .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
        }
    }

    if (
        message &&
        typeof message === 'object' &&
        'message' in message &&
        typeof message.message === 'string'
    ) {
        const { message: messageString, extra } = extractMessageAndExtra(message.message)
        return {
            message: messageString,
            extra,
        }
    }

    return {
        message: defaultMessage,
        extra: {},
    }
}

export const LoggerLayer = Logger.replaceEffect(
    Logger.defaultLogger,
    // Custom logger implementation
    Effect.gen(function* () {
        return Logger.make(args => {
            const { message: originalMessage, fiberId, cause, annotations } = args

            console.log({ args })

            function additionalContext() {
                // additional context provided by AppCtx through annotations
                const annotationsEntries = HashMap.entries(annotations)
                const additionalContext: Record<string, unknown> = {}
                for (const [key, value] of annotationsEntries) {
                    additionalContext[key] = value
                }
                return additionalContext
            }

            const fiberIdString = 'id' in fiberId ? fiberId.id : undefined
            const failures = Cause.failures(cause)

            const { message, extra: extraWithoutAdditionalContext } =
                extractMessageAndExtra(originalMessage)

            const extra = {
                ...extraWithoutAdditionalContext,
                ...additionalContext(),
            }

            if (Chunk.isNonEmpty(failures)) {
                Chunk.forEach(failures, originalFailure => {
                    const failure = originalFailure

                    if (failure instanceof Error) {
                        console.log({
                            error: failure,
                            message,
                            extra,
                            fiberId: fiberIdString,
                        })
                    } else if (typeof failure === 'object') {
                        console.log({
                            message,
                            extra: {
                                ...extra,
                                ...failure,
                            },
                            fiberId: fiberIdString,
                        })
                    } else {
                        console.error("Don't know how to handle failure", failure)
                        console.log({
                            message,
                            extra,
                            fiberId: fiberIdString,
                        })
                    }
                })
            }
            console.log(message)
        })
    }),
)

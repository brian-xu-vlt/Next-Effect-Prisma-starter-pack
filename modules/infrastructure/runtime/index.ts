import { LoggerLayerLive } from 'modules/infrastructure/runtime/logger/live'
import { Effect, Layer, Runtime } from 'effect'
import { Scope } from 'effect/Scope'

const runtime = Effect.runSync(Effect.scoped(Layer.toRuntime(LoggerLayerLive)))

export const CONCURRENCY_LIMIT = 10

const wrapBeforeRun = <A, E>(effect: Effect.Effect<A, E, Scope>) =>
   effect.pipe(Effect.scoped, Effect.withConcurrency(CONCURRENCY_LIMIT))

export const appRunPromise = <A, E>(effect: Effect.Effect<A, E, Scope>) =>
   effect.pipe(wrapBeforeRun, Runtime.runPromise(runtime))

export const appRunPromiseExit = <A, E>(effect: Effect.Effect<A, E, Scope>) =>
   effect.pipe(wrapBeforeRun, Runtime.runPromiseExit(runtime))

export const appRunPromiseWithLayer =
   <A, E, L>(layer: Layer.Layer<L, unknown, Scope>) =>
   (effect: Effect.Effect<A, E, Scope | L>) =>
      effect.pipe(Effect.provide(layer), appRunPromise)

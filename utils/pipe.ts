import { UseFormReturn } from "react-hook-form";

export const PIPE_BLOCK = Symbol("PipeBlock");
type Fn<In, Out> = (input: In) => Out;

export function pipe<A, B>(fn1: Fn<A, B>): (this: UseFormReturn, input?: A) => B;
export function pipe<A, B, C>(
  fn1: Fn<A, B>,
  fn2: Fn<B, C>
): (this: UseFormReturn, input?: A) => C;
export function pipe<A, B, C, D>(
  fn1: Fn<A, B>,
  fn2: Fn<B, C>,
  fn3: Fn<C, D>
): (this: UseFormReturn, input?: A) => D;
export function pipe<A, B, C, D, E>(
  fn1: Fn<A, B>,
  fn2: Fn<B, C>,
  fn3: Fn<C, D>,
  fn4: Fn<D, E>
): (this: UseFormReturn, input?: A) => E;
export function pipe<A, B, C, D, E, F>(
  fn1: Fn<A, B>,
  fn2: Fn<B, C>,
  fn3: Fn<C, D>,
  fn4: Fn<D, E>,
  fn5: Fn<E, F>
): (this: UseFormReturn, input?: A) => F;
export function pipe<A, B, C, D, E, F, G>(
  fn1: Fn<A, B>,
  fn2: Fn<B, C>,
  fn3: Fn<C, D>,
  fn4: Fn<D, E>,
  fn5: Fn<E, F>,
  fn6: Fn<F, G>
): (this: UseFormReturn, input?: A) => G;
export function pipe<A, B, C, D, E, F, G, H>(
  fn1: Fn<A, B>,
  fn2: Fn<B, C>,
  fn3: Fn<C, D>,
  fn4: Fn<D, E>,
  fn5: Fn<E, F>,
  fn6: Fn<F, G>,
  fn7: Fn<G, H>
): (this: UseFormReturn, input?: A) => H;
export function pipe<A, B, C, D, E, F, G, H, I>(
  fn1: Fn<A, B>,
  fn2: Fn<B, C>,
  fn3: Fn<C, D>,
  fn4: Fn<D, E>,
  fn5: Fn<E, F>,
  fn6: Fn<F, G>,
  fn7: Fn<G, H>,
  fn8: Fn<H, I>
): (this: UseFormReturn, input?: A) => I;

export function pipe<Fns extends Fn<unknown, unknown>[]>(
  ...fns: Fns
): Fn<UseFormReturn, unknown> {
  return function (this: UseFormReturn) {
    let returnValue;
    for (const fn of fns) {
      returnValue = fn.call(this, returnValue);
      if (returnValue === PIPE_BLOCK) break;
    }
    return returnValue;
  };
}

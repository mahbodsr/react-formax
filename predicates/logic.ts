import { UseFormReturn } from "react-hook-form";

type Predicate<T> = (this: UseFormReturn, ...inputs: T[]) => boolean;

export const and = <T>(...predicates: Predicate<T>[]): Predicate<T> =>
  function (this: UseFormReturn, ...input) {
    return predicates.every((p) => p.call(this, ...input));
  };

export const or = <T>(...predicates: Predicate<T>[]): Predicate<T> =>
  function (...input) {
    return predicates.some((p) => p.call(this, ...input));
  };
export const not = <T>(predicate: Predicate<T>): Predicate<T> =>
  function (...input) {
    return !predicate.call(this, ...input);
  };

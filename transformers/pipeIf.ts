import { UseFormReturn } from "react-hook-form";
import { PIPE_BLOCK } from "../utils";
import { createTransform } from "./createTransform";

export const pipeIf = createTransform<
  (this: UseFormReturn, input: unknown) => boolean,
  unknown,
  unknown | symbol
>(function ({ config: predicate, argument }) {
  const predicateValue = predicate.call(this, argument);
  if (predicateValue) return predicateValue;
  return PIPE_BLOCK;
});

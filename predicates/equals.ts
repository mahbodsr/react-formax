import { createPredicate } from "./createPredicate";

export const equals = createPredicate<{ value: unknown }, unknown>(function ({
  argument,
  config,
}) {
  return argument === config.value;
});

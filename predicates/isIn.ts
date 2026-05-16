import { createPredicate } from "./createPredicate";

export const isIn = createPredicate<{ list: unknown[] }, unknown>(function ({
  argument,
  config,
}) {
  return config.list.includes(argument);
});

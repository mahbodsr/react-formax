import { createTransform } from "./createTransform";

export const extractFromObject = createTransform<
  { key: string },
  any,
  any
>(function ({ argument, config }) {
  return argument?.[config.key];
});

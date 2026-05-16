import { createTransform } from "./createTransform";

export const fieldValue = createTransform<
  { fieldName: string },
  undefined,
  any
>(function ({ config }) {
  return this.getValues(config.fieldName);
});

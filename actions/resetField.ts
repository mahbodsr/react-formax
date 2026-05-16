import { createAction } from "./createAction";

/**
 * Resets a field to its default value
 */
export const resetField = createAction<{ fieldName: string }, undefined>(
  function ({ config }) {
    this.resetField(config.fieldName);
  }
);

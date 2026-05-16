import { createAction } from "./createAction";

/**
 * Sets a field to a specific value
 */
export const setField = createAction<{ fieldName: string }, any>(
  function ({ config, argument }) {
    this.setValue(config.fieldName, argument);
  },
);

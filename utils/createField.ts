import type { IFormField } from "../types";

export const createField = <
  C extends React.ComponentType<any>,
  K extends string
>(
  field: IFormField<C, K>
): IFormField<C, K> => field;

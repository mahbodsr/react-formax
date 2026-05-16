import type { IFormField, FormSchema, FormOptions } from "../types";

export function createForm<Fields extends Record<string, IFormField<any, any>>>(
  fields: Fields,
  options?: FormOptions
): FormSchema<Fields> {
  return { fields, options };
}

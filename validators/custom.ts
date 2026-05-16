import { Validator } from "../types";

export const custom = (
  validationFn: (value: any) => boolean,
  message: string,
): Validator => {
  return (value) => validationFn(value) || message;
};

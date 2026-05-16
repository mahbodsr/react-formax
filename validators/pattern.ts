import validator from "validator";
import { Validator } from "../types";

export const pattern = (regex: RegExp, message: string): Validator => {
  return (value) =>
    !value || validator.matches(String(value), regex) || message;
};

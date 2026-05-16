import validator from "validator";
import { Validator } from "../types";

export const required = (message: string): Validator => {
  return (value) =>
    !validator.isEmpty(String(value ?? ""), { ignore_whitespace: true }) ||
    message;
};

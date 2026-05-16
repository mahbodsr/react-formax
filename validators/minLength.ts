import validator from "validator";
import { Validator } from "../types";

export const minLength = (min: number, message: string): Validator => {
  return (value) => validator.isLength(String(value ?? ""), { min }) || message;
};

import validator from "validator";
import { Validator } from "../types";

export const maxLength = (max: number, message: string): Validator => {
  return (value) => validator.isLength(String(value ?? ""), { max }) || message;
};

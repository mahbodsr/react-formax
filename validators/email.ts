import validator from "validator";
import { Validator } from "../types";

export const email = (message: string): Validator => {
  return (value) => !value || validator.isEmail(String(value)) || message;
};

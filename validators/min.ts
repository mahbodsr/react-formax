import { Validator } from "../types";

export const min = (min: number, message: string): Validator => {
  return (value) => {
    const num = Number(value);
    return isNaN(num) || num >= min || message;
  };
};

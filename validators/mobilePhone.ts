import validator from "validator";
import { Validator } from "../types";

export const mobilePhone = (
  locale: validator.MobilePhoneLocale = "fa-IR",
  message: string,
): Validator => {
  return (value) =>
    !value || validator.isMobilePhone(String(value), locale) || message;
};

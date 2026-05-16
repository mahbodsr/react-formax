import { createPredicate } from "./createPredicate";

export const always = createPredicate(function () {
  return true;
});

import { UseFormReturn } from "react-hook-form";

export const createPredicate = <Config = undefined, Argument = undefined>(
  fn: (
    this: UseFormReturn,
    params: {
      argument: Argument;
      config: Config;
    }
  ) => boolean
) => {
  const wrapper = (config?: Config) => {
    return function (this: UseFormReturn, argument?: Argument) {
      return fn.call(this, { argument, config } as {
        argument: Argument;
        config: Config;
      });
    };
  };

  return wrapper as Config extends undefined
    ? (
        config?: Config
      ) => Argument extends undefined
        ? (this: UseFormReturn, argument?: Argument) => boolean
        : (this: UseFormReturn, argument: Argument) => boolean
    : (
        config: Config
      ) => Argument extends undefined
        ? (this: UseFormReturn, argument?: Argument) => boolean
        : (this: UseFormReturn, argument: Argument) => boolean;
};

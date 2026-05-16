import { UseFormReturn } from "react-hook-form";

export const createAction = <Config, Argument>(
  fn: (
    this: UseFormReturn,
    params: {
      argument: Argument;
      config: Config;
    }
  ) => void
) => {
  const wrapper = (config?: Config) =>
    function (this: UseFormReturn, argument?: Argument) {
      return fn.call(this, { argument, config } as {
        argument: Argument;
        config: Config;
      });
    };

  return wrapper as unknown as Config extends undefined
    ? (
        config?: Config
      ) => Argument extends undefined
        ? (this: UseFormReturn, argument?: Argument) => void
        : (this: UseFormReturn, argument: Argument) => void
    : (
        config: Config
      ) => Argument extends undefined
        ? (this: UseFormReturn, argument?: Argument) => void
        : (this: UseFormReturn, argument: Argument) => void;
};

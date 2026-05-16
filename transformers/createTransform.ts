import { UseFormReturn } from "react-hook-form";

export const createTransform = <Config, Argument, Out>(
  fn: (
    this: UseFormReturn,
    params: {
      argument: Argument;
      config: Config;
    }
  ) => Out
) => {
  const wrapper = (config?: Config) =>
    function (this: UseFormReturn, argument?: Argument) {
      return fn.call(this, { argument, config } as {
        argument: Argument;
        config: Config;
      });
    };

  // Use conditional types to handle optional parameters
  return wrapper as unknown as Config extends undefined
    ? (
        config?: Config
      ) => Argument extends undefined
        ? (this: UseFormReturn, argument?: Argument) => Out
        : (this: UseFormReturn, argument: Argument) => Out
    : (
        config: Config
      ) => Argument extends undefined
        ? (this: UseFormReturn, argument?: Argument) => Out
        : (this: UseFormReturn, argument: Argument) => Out;
};

import type * as React from "react";
import type { UseFormReturn } from "react-hook-form";

export type FieldWrapperProps = {
  name: string;
  span?: number;
  label?: string;
  children: React.ReactNode;
  control: any;
};

export type Validator = (value: any) => string | true;

export interface IWatch<K extends string = string> {
  field: K;
  reRender?: true;
  onChange?: (this: UseFormReturn) => void;
}

export interface IFormField<
  C extends React.ComponentType<any> = React.ComponentType<any>,
  K extends string = string,
> {
  Component: C;
  watch?: IWatch<K>;
  defaultValue?: React.ComponentProps<C>["defaultValue"];
  getProps?: (this: UseFormReturn) => React.ComponentProps<C>;
  getDisabled?: (this: UseFormReturn) => boolean;
  getHidden?: (this: UseFormReturn) => boolean;
  span: number;
  label?: string;
  controlled?: boolean;
  validators?: Validator[];
  valueAs?: (value: any) => any;
}

export interface FormOptions {
  /** @default 12 */
  cols?: number;
  /** @default 4 */
  gapX?: number;
  /** @default 4 */
  gapY?: number;
}

export type FormSchema<Fields extends Record<string, IFormField>> = {
  fields: Fields;
  options?: FormOptions;
};

export interface Argument {
  config?: object;
  argument: unknown;
}
export type Transform<In extends Argument, Out = any> = (
  this: UseFormReturn,
  input: In,
) => Out;

export type Predicate<In extends Argument = Argument> = (
  this: UseFormReturn,
  input: In,
) => boolean;

export type Action<In extends Argument = Argument> = (
  this: UseFormReturn,
  input: In,
) => void;

import { useForm, UseFormProps, UseFormReturn } from "react-hook-form";
import type { IFormField } from "../types";

type UseFormBuilderOptions = Omit<UseFormProps, "defaultValues">;

export const useFormBuilder = <
  Fields extends Record<string, IFormField>,
>(
  fields: Fields,
  options?: UseFormBuilderOptions,
): UseFormReturn => {
  const defaultValues = Object.fromEntries(
    Object.entries(fields).map(([key, field]) => [key, field.defaultValue]),
  );

  return useForm({
    ...options,
    defaultValues,
  });
};

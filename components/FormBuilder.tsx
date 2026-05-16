import React from "react";
import { SubmitHandler } from "react-hook-form";
import type { IFormField, FormSchema, FieldWrapperProps } from "../types";
import { useFormBuilder } from "../hooks/useFormBuilder";
import { useFormGridStyle } from "../hooks/useFormGridStyle";
import { useFormFields } from "../hooks/useFormFields";

type FormBuilderProps<
  Fields extends Record<string, IFormField<React.ComponentType<any>, string>>,
> = {
  schema: FormSchema<Fields>;
  onSubmit: SubmitHandler<any>;
  id?: string;
  className?: string;
  fallback?: React.ReactNode;
  FieldWrapper: React.ComponentType<FieldWrapperProps>;
};

const FormBuilder = <
  Fields extends Record<string, IFormField<React.ComponentType<any>, string>>,
>({
  schema,
  onSubmit,
  id,
  className,
  fallback = null,
  FieldWrapper,
}: FormBuilderProps<Fields>) => {
  const form = useFormBuilder(schema.fields);

  const gridStyle = useFormGridStyle(schema.options);

  const fieldElements = useFormFields({
    fields: schema.fields,
    form,
    fallback,
    FieldWrapper,
  });

  return (
    <form
      id={id}
      className={className}
      style={gridStyle}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {Object.values(fieldElements)}
    </form>
  );
};

export default FormBuilder;

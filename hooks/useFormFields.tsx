import React, { Suspense } from "react";
import { UseFormReturn } from "react-hook-form";
import type { IFormField, FieldWrapperProps } from "../types";
import VisibilityController from "../components/VisibilityController";
import FieldController from "../components/FieldController";

type UseFormFieldsOptions<
  Fields extends Record<string, IFormField<React.ComponentType<any>, string>>,
> = {
  fields: Fields;
  form: UseFormReturn;
  fallback?: React.ReactNode;
  FieldWrapper: React.ComponentType<FieldWrapperProps>;
};

export const useFormFields = <
  Fields extends Record<string, IFormField<React.ComponentType<any>, string>>,
>({
  fields,
  form,
  fallback = null,
  FieldWrapper,
}: UseFormFieldsOptions<Fields>) => {
  const fieldElements: Record<string, React.ReactElement> = {};

  Object.entries(fields).forEach(([key, field]) => {
    fieldElements[key] = (
      <FieldWrapper
        key={key}
        name={key}
        span={field.span}
        label={field.label}
        control={form.control}
      >
        <VisibilityController form={form} getHidden={field.getHidden}>
          <Suspense fallback={fallback}>
            <FieldController
              Component={field.Component}
              name={key}
              form={form}
              getDisabled={field.getDisabled}
              getProps={field.getProps}
              watchField={field.watch?.field}
              watchReRender={field.watch?.reRender}
              watchOnChange={field.watch?.onChange}
              controlled={field.controlled}
              validators={field.validators}
              valueAs={field.valueAs}
            />
          </Suspense>
        </VisibilityController>
      </FieldWrapper>
    );
  });

  return fieldElements as Record<keyof Fields, React.ReactElement>;
};

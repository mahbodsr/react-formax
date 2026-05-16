import React, { useCallback } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import type { IFormField, IWatch } from "../types";
import { useWatchSubscription } from "../hooks/useWatchSubscription";

export interface FieldControllerProps {
  Component: React.ComponentType;
  name: string;
  form: UseFormReturn;
  getDisabled?: IFormField["getDisabled"];
  getProps?: IFormField["getProps"];
  watchField?: IWatch["field"];
  watchReRender?: IWatch["reRender"];
  watchOnChange?: IWatch["onChange"];
  controlled?: IFormField["controlled"];
  validators?: IFormField["validators"];
  valueAs?: IFormField["valueAs"];
}

enum EventEnum {
  CHANGE = "change",
  BLUR = "blur",
}

// Same as react-hook-form's getEventValue
const getEventValue = (event: any) =>
  typeof event === "object" &&
  event !== null &&
  "target" in event &&
  event.target
    ? event.target.type === "checkbox"
      ? event.target.checked
      : event.target.value
    : event;

const FieldController = ({
  Component,
  name,
  form,
  getDisabled,
  getProps,
  watchField,
  watchReRender,
  watchOnChange,
  controlled,
  validators,
  valueAs,
}: FieldControllerProps) => {
  useWatch({
    control: form.control,
    name: watchField!,
    disabled: !watchField || !watchReRender,
  });

  const selfWatched = useWatch({
    control: form.control,
    name: name,
    disabled: !controlled,
    exact: true,
  });

  useWatchSubscription({
    form,
    watchField,
    onChange: watchOnChange,
  });

  const props = getProps?.call(form);
  const disabled = getDisabled?.call(form);

  const validate = useCallback(
    (value: any) => {
      if (!validators || validators.length === 0) return true;

      for (const validator of validators) {
        const result = validator(value);
        if (result !== true) {
          return result;
        }
      }
      return true;
    },
    [validators],
  );

  const register = form.register(name, {
    disabled,
    validate: validators && validators.length > 0 ? validate : undefined,
  });

  const onChange = useCallback(
    (event: unknown) => {
      const rawValue = getEventValue(event);
      const transformedValue = valueAs?.(rawValue) ?? rawValue;

      register.onChange({
        target: {
          value: transformedValue,
          name,
        },
        type: EventEnum.CHANGE,
      });
    },
    [name, register, valueAs],
  );

  const onBlur = useCallback(() => {
    register.onBlur({
      target: {
        value: form.getValues(name),
        name,
      },
      type: EventEnum.BLUR,
    });
  }, [register, form, name]);

  return (
    <Component
      {...register}
      onChange={onChange}
      onBlur={onBlur}
      id={register.name}
      value={controlled ? selfWatched : undefined}
      {...props}
    />
  );
};

export default FieldController;

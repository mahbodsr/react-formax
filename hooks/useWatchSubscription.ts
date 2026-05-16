import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { IWatch } from "../types";

type UseWatchSubscriptionOptions = {
  form: UseFormReturn;
  watchField?: string;
  onChange?: IWatch<string>["onChange"];
};

export const useWatchSubscription = ({
  form,
  watchField,
  onChange,
}: UseWatchSubscriptionOptions) => {
  useEffect(() => {
    if (!watchField || !onChange) return;

    const unsubscribe = form.subscribe({
      name: watchField,
      formState: {
        values: true,
        dirtyFields: false,
        errors: false,
        isDirty: false,
        isValid: false,
        isValidating: false,
        touchedFields: false,
        validatingFields: false,
      },
      exact: true,
      callback: () => {
        onChange.call(form);
      },
    });

    return unsubscribe;
  }, [form, watchField, onChange]);
};

import { UseFormReturn } from "react-hook-form";
import type { IFormField } from "../types";

type VisibilityControllerProps = {
  form: UseFormReturn;
  getHidden?: IFormField<React.ComponentType, string>["getHidden"];
  children: React.ReactNode;
};

const VisibilityController = ({
  form,
  getHidden,
  children,
}: VisibilityControllerProps) => {
  if (getHidden?.call?.(form)) return null;

  return children;
};

export default VisibilityController;

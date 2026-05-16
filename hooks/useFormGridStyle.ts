import { useMemo } from "react";
import type { FormOptions } from "../types";

const DEFAULT_COLS = 12;
const DEFAULT_GAP_X = 4;
const DEFAULT_GAP_Y = 4;

export const useFormGridStyle = (options?: FormOptions) => {
  return useMemo(() => {
    const cols = options?.cols ?? DEFAULT_COLS;
    const gapX = options?.gapX ?? DEFAULT_GAP_X;
    const gapY = options?.gapY ?? DEFAULT_GAP_Y;

    return {
      gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      display: "grid" as const,
      rowGap: `${gapY / 4}rem`,
      columnGap: `${gapX / 4}rem`,
    };
  }, [options?.cols, options?.gapX, options?.gapY]);
};

import { createContext, useContext } from "react";

type IsSpatialContextValue = {
  isSpatial: boolean;
};

export const IsSpatialContext = createContext<
  IsSpatialContextValue | undefined
>(undefined);

export function useIsSpatial() {
  const ctx = useContext(IsSpatialContext);
  if (!ctx) {
    throw new Error(
      "useIsSpatial must be used within IsSpatialContext.Provider"
    );
  }
  return ctx;
}

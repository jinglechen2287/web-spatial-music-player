import { createContext, useContext } from "react";

type BackgroundContextValue = {
  backgroundTheme: "day" | "night";
  setBackgroundTheme: React.Dispatch<React.SetStateAction<"day" | "night">>;
};

export const BackgroundContext = createContext<
  BackgroundContextValue | undefined
>(undefined);

export function useBackground() {
  const ctx = useContext(BackgroundContext);
  if (!ctx) {
    throw new Error(
      "useBackground must be used within BackgroundContext.Provider"
    );
  }
  return ctx;
}

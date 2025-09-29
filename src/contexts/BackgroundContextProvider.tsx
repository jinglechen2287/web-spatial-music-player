import { useState } from "react";
import { BackgroundContext } from "./BackgroundContext";

export function BackgroundContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const getDefaultBgTheme = () => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "night"
        : "day";
    }
    return "day";
  };
  const [backgroundTheme, setBackgroundTheme] = useState<"day" | "night">(
    getDefaultBgTheme
  );

  return (
    <BackgroundContext.Provider value={{ backgroundTheme, setBackgroundTheme }}>
      {children}
    </BackgroundContext.Provider>
  );
}

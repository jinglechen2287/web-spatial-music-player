import { createContext, useContext } from "react";

type PlayerContextValue = {
  activeIndex: number;
  isPlaying: boolean;
  toggleIsPlaying: () => void;
  goNext: () => void;
  goPrev: () => void;
  currentCategoryId: string;
  isCarouselVisible: boolean;
  toggleCarouselVisible: () => void;
};

export const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) {
    throw new Error("usePlayer must be used within PlayerProvider");
  }
  return ctx;
}

import { useMemo, useState } from "react";
import { categories } from "~/data";
import { PlayerContext } from "./PlayerContext";

export function PlayerProvider({ children }: { children: React.ReactNode }) {
    const [activeIndex, setActiveIndex] = useState(2);
    const [isPlaying, setIsPlaying] = useState(false);
    const toggleIsPlaying = () => setIsPlaying((p) => !p);
    const [isCarouselVisible, setIsCarouselVisible] = useState(true);
    const toggleCarouselVisible = () => setIsCarouselVisible((v) => !v);
  
    const goNext = () => setActiveIndex((i) => (i + 1) % categories.length);
    const goPrev = () =>
      setActiveIndex((i) => (i - 1 + categories.length) % categories.length);
  
    const currentCategoryId = useMemo(
      () => categories[activeIndex]?.id ?? "",
      [activeIndex]
    );
  
    const value = useMemo(
      () => ({
        activeIndex,
        isPlaying,
        toggleIsPlaying,
        goNext,
        goPrev,
        currentCategoryId,
        isCarouselVisible,
        toggleCarouselVisible,
      }),
      [activeIndex, isPlaying, currentCategoryId, isCarouselVisible]
    );
  
    return (
      <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
    );
  }
import { useEffect, useRef } from "react";
import { categories } from "~/data";
import { usePlayer } from "~/contexts/PlayerContext";

export default function MusicPlayerAudio() {
  const { activeIndex, isPlaying } = usePlayer();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastSrcRef = useRef<string | null>(null);
  const baseVolumeRef = useRef(1);
  const fadeIdRef = useRef(0);
  const opIdRef = useRef(0);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    const nextSrc = categories[activeIndex]?.audioSrc ?? "";
    const srcChanged = lastSrcRef.current !== nextSrc;
    const currentOpId = ++opIdRef.current;

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    const easeSmooth = (t: number) => t * t * (3 - 2 * t); // smoothstep

    const fadeTo = (targetVolume: number, durationMs: number) =>
      new Promise<void>((resolve) => {
        const thisFadeId = ++fadeIdRef.current;
        const start = performance.now();
        const startVol = audioEl.volume;
        const delta = clamp01(targetVolume) - startVol;

        const step = (now: number) => {
          if (
            thisFadeId !== fadeIdRef.current ||
            currentOpId !== opIdRef.current
          ) {
            resolve();
            return;
          }
          const elapsed = now - start;
          const t = durationMs <= 0 ? 1 : Math.min(1, elapsed / durationMs);
          const v = clamp01(startVol + delta * easeSmooth(t));
          audioEl.volume = v;
          if (t < 1) {
            requestAnimationFrame(step);
          } else {
            resolve();
          }
        };
        requestAnimationFrame(step);
      });

    const fadeOutAndPause = async (durationMs: number) => {
      await fadeTo(0, durationMs);
      if (currentOpId !== opIdRef.current) return;
      audioEl.pause();
    };

    const fadeInAndPlay = async (durationMs: number) => {
      audioEl.volume = 0;
      try {
        await audioEl.play();
      } catch (error) {
        console.error("Audio playback failed:", error);
        return;
      }
      if (currentOpId !== opIdRef.current) return;
      await fadeTo(baseVolumeRef.current, durationMs);
    };

    const run = async () => {
      // Ensure volume baseline
      audioEl.volume = clamp01(audioEl.volume);

      if (srcChanged && isPlaying) {
        await fadeTo(0, 300);
        if (currentOpId !== opIdRef.current) return;
        audioEl.src = nextSrc;
        audioEl.currentTime = 0;
        lastSrcRef.current = nextSrc;
        await fadeInAndPlay(400);
        return;
      }

      if (srcChanged && !isPlaying) {
        audioEl.src = nextSrc;
        audioEl.currentTime = 0;
        lastSrcRef.current = nextSrc;
        audioEl.volume = baseVolumeRef.current;
        return;
      }

      if (!srcChanged && isPlaying) {
        await fadeInAndPlay(400);
        return;
      }

      // !srcChanged && !isPlaying
      // Only fade out if currently not already paused
      if (!audioEl.paused) {
        await fadeOutAndPause(300);
      } else {
        audioEl.pause();
        audioEl.volume = baseVolumeRef.current;
      }
    };

    void run();
  }, [activeIndex, isPlaying]);

  return (
    <audio ref={audioRef} preload="auto" style={{ display: "none" }} loop />
  );
}

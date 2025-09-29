import MusicPlayerCarousel from "~/components/MusicPlayerCarousel";
import MusicPlayerControl from "~/components/MusicPlayerControl";
import MusicPlayerAudio from "~/components/MusicPlayerAudio";
import { PlayerProvider } from "~/contexts/PlayerContextProvider";

export default function MusicPlayer() {
  return (
    <PlayerProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "calc(100% - 60px)",
          overflow: "hidden",
          gap: 24,
        }}
      >
        <MusicPlayerAudio />
        <MusicPlayerCarousel />
        <MusicPlayerControl />
      </div>
    </PlayerProvider>
  );
}

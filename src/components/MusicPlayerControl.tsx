import { useState } from "react";
import { categories } from "~/data";
import { MatteGlass } from "./styles";
import { usePlayer } from "~/contexts/PlayerContext";
import { useIsSpatial } from "~/contexts/IsSpatialContext";
import {
  RewindIcon,
  PauseIcon,
  PlayIcon,
  FastForwardIcon,
  SlideshowIcon,
} from "@phosphor-icons/react";

export default function MusicPlayerControl() {
  const { isSpatial } = useIsSpatial();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
        padding: "12px 24px",
        borderRadius: 9999,
        transform: `translateZ(90px)${isSpatial ? " rotateX(15deg)" : ""}`,
        ...MatteGlass(),
      }}
    >
      <ControlCore />
      <ControlInfo />
      <ControlCarouselToggle />
    </div>
  );
}

function ControlCore() {
  const { isPlaying, toggleIsPlaying, goPrev, goNext } = usePlayer();

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
      <ControlButton ariaLabel="Previous" onClick={goPrev}>
        <RewindIcon weight="fill" />
      </ControlButton>
      <ControlButton
        ariaLabel={isPlaying ? "Pause" : "Play"}
        onClick={toggleIsPlaying}
      >
        {isPlaying ? <PauseIcon weight="fill" /> : <PlayIcon weight="fill" />}
      </ControlButton>
      <ControlButton ariaLabel="Next" onClick={goNext}>
        <FastForwardIcon weight="fill" />
      </ControlButton>
    </div>
  );
}

function ControlInfo() {
  const { activeIndex } = usePlayer();
  const currentCatagory = categories[activeIndex];

  return (
    <div
      style={{
        width: 240,
        display: "flex",
        flex: "1 0 0",
        alignItems: "center",
        gap: 12,
        padding: 6,
        borderRadius: 8,
        background: "rgba(0,0,0,0.50)",
        backdropFilter: "blur(50px)",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 4,
          backgroundImage: `url(${currentCatagory.cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 2,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: -0.25,
          }}
        >
          {currentCatagory.title}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: 12,
            color: "#e5e7ebdd",
            maxWidth: 180,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {currentCatagory.description}
        </p>
      </div>
    </div>
  );
}

function ControlCarouselToggle() {
  const { isCarouselVisible, toggleCarouselVisible } = usePlayer();
  const ariaLabel = isCarouselVisible ? "hide" : "show";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <ControlButton ariaLabel={ariaLabel} onClick={toggleCarouselVisible}>
        {isCarouselVisible ? <XIcon /> : <SlideshowIcon weight="fill" />}
      </ControlButton>
    </div>
  );
}

function ControlButton(props: {
  ariaLabel?: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { isSpatial } = useIsSpatial();
  return (
    <button
      type="button"
      aria-label={props.ariaLabel ?? ""}
      onClick={props.onClick}
      // spatial mode hover is handled by the OS
      onMouseEnter={() => setIsHovered(!isSpatial)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(!isSpatial)}
      onBlur={() => setIsHovered(false)}
      style={{
        width: 40,
        height: 40,
        borderRadius: 9999,
        fontSize: 22,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        border: "1px solid rgba(255,255,255,0)",
        background: isHovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0)",
        color: "#e5e7eb",
        userSelect: "none",
        transition: "background-color 120ms ease, border-color 120ms ease",
      }}
    >
      {props.children}
    </button>
  );
}

function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

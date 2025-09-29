import { LivingRoomBgStyles } from "~/components/styles";
import { BackgroundContextProvider } from "~/contexts/BackgroundContextProvider";
import { useIsSpatial } from "~/contexts/IsSpatialContext";
import { useBackground } from "~/contexts/BackgroundContext";

export default function WebAppBg() {
  return (
    <>
      <BackgroundContextProvider>
        <BgSwitcher />
        <LivingRoomBg />
      </BackgroundContextProvider>
    </>
  );
}

function LivingRoomBg() {
  const { backgroundTheme } = useBackground();
  return (
    <>
      <div
        id="app-background-day"
        style={{
          ...LivingRoomBgStyles("day"),
          opacity: backgroundTheme === "day" ? 1 : 0,
        }}
      />
      <div
        id="app-background-night"
        style={{
          ...LivingRoomBgStyles("night"),
          opacity: backgroundTheme === "night" ? 1 : 0,
        }}
      />
    </>
  );
}

function BgSwitcher() {
  const { backgroundTheme: backgroundIndex, setBackgroundTheme } =
    useBackground();
  const { isSpatial } = useIsSpatial();
  const isNight = backgroundIndex === "night";
  const ICON_SIZE = 20;
  const iconStyles = {
    height: `${ICON_SIZE}px`,
    width: `${ICON_SIZE}px`,
    gridColumn: "1 / 1",
    gridRow: "1 / 1",
    transition: "transform 500ms",
  };
  const containerStyles = {
    width: `${ICON_SIZE * 2}px`,
    height: `${ICON_SIZE * 2}px`,
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
    background: isNight
      ? "rgba(20, 20, 28, 0.60)"
      : "rgba(255, 255, 255, 0.60)",
    boxShadow: isNight
      ? "0 10px 30px rgba(0,0,0,0.36), inset 0 1px 0 rgba(96, 96, 96, 0.60)"
      : "0 10px 30px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.60)",
    backdropFilter: "blur(12px) saturate(140%)",
    WebkitBackdropFilter: "blur(12px) saturate(140%)",
    lineHeight: "1",
    transition: "background-color 300ms ease, box-shadow 300ms ease",
  } as const;

  return (
    <div
      style={{
        display: isSpatial ? "none" : "flex",
        justifyContent: "center",
        width: "100%",
        paddingTop: 20,
      }}
    >
      <label htmlFor="switch" style={containerStyles}>
        <input
          type="checkbox"
          id="switch"
          style={{ display: "none" }}
          checked={isNight}
          onChange={() =>
            setBackgroundTheme((prev) => (prev === "day" ? "night" : "day"))
          }
          aria-label={isNight ? "Switch to Day" : "Switch to Night"}
        />
        <div
          className="icon icon--moon"
          style={{
            ...iconStyles,
            transform: isNight ? "scale(1)" : "scale(0)",
            color: "#5878F0",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width={ICON_SIZE}
            height={ICON_SIZE}
          >
            <path
              fillRule="evenodd"
              d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>

        <div
          className="icon icon--sun"
          style={{
            ...iconStyles,
            transform: isNight ? "scale(0)" : "scale(1)",
            color: "#F59E0B",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width={ICON_SIZE}
            height={ICON_SIZE}
          >
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"></path>
          </svg>
        </div>
      </label>
    </div>
  );
}

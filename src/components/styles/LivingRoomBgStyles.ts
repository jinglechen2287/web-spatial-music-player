import background_day from "~/assets/background_day.jpg";
import background_night from "~/assets/background_night.jpg";
import { useIsSpatial } from "~/contexts/IsSpatialContext";

export const LivingRoomBgStyles: (theme: "day" | "night") => React.CSSProperties = (
  theme
) => {
  const { isSpatial } = useIsSpatial();
  return {
    width: "100vw",
    height: "100vh",
    position: "absolute" as const,
    top: 0,
    left: 0,
    zIndex: -1,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundImage: isSpatial
      ? "none"
      : `url(${theme === "day" ? background_day : background_night})`,
    transition: "opacity 600ms ease-in-out",
  };
};

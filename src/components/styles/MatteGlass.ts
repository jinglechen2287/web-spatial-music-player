import { useIsSpatial } from "~/contexts/IsSpatialContext";

export const MatteGlass: () => React.CSSProperties = () => {
  const { isSpatial } = useIsSpatial();
  return {
    color: "#e5e7eb",
    border: "1px solid rgba(255,255,255,0.40)",
    boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
    background: isSpatial ? "none" : "rgba(128, 128, 128, 0.30)",
    backdropFilter: isSpatial ? "none" : "blur(20px)",
    WebkitBackdropFilter: isSpatial ? "none" : "blur(20px)",
    enableXr: true,
    "--xr-background-material": "translucent",
  };
};

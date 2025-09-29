import { IsSpatialContext } from "./IsSpatialContext";

export function IsSpatialProvider({ children }: { children: React.ReactNode }) {
  const isSpatial = navigator.userAgent.includes("WebSpatial");
  return (
    <IsSpatialContext.Provider value={{ isSpatial }}>
      {children}
    </IsSpatialContext.Provider>
  );
}

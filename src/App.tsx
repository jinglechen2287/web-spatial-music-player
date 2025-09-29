import MusicPlayer from "~/components/MusicPlayer";
import WebAppBg from "~/components/WebAppBg";
import { IsSpatialProvider } from "~/contexts/IsSpatialContextProvider";

function App() {
  return (
    <IsSpatialProvider>
      <div
        id="app-container"
        style={{
          width: "100vw",
          height: "100vh",
          position: "relative",
        }}
      >
        <WebAppBg />
        <MusicPlayer />
      </div>
    </IsSpatialProvider>
  );
}

export default App;

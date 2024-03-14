import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import ActivityType from "./scenes/Forms/ActivityType";
import ActivityArea from "./scenes/Forms/ActivityArea";
import EventType from "./scenes/Forms/EventType";
import EventArea from "./scenes/Forms/EventArea";
import Activities from "./scenes/Pages/Activities";
import Events from "./scenes/Pages/Events";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Map from "./scenes/Forms/Map";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/activitytype" element={<ActivityType />} />
              <Route path="/activityarea" element={<ActivityArea />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/eventtype" element={<EventType />} />
              <Route path="/eventarea" element={<EventArea />} />
              <Route path="/events" element={<Events />} />
              <Route path="/map" element={<Map />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

import { Grid } from "@mui/material";
import NavigationBar from "./components/NavigationBar";
import Questions from "./pages/Questions";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";


function App() {

  return (
    <Grid sx={{ width: "100%" }}>
      <NavigationBar />
      <Routes>
        <Route path="/Questions" element={< Questions />} />
        <Route path="/Profile" element={< Profile />} />
        <Route path="/" element={< Dashboard />} />
      </Routes>
    </Grid>

  );
}

export default App;

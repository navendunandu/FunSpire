import { Grid } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import "./css/style.css"
import { LeftContainer } from "./components/LeftContainer";
import { RightContainer } from "./components/RightContainer";
import Signup from "./forms/Signup";
import Login from "./forms/Login";

function App() {

  return (
      <Grid container className="g-container">
        <Grid item xs={6} className="g-leftContainer">
          <LeftContainer />
        </Grid>
        <Grid item xs={6} className="g-rightContainer">
          <Routes>
            <Route path="/" element={<RightContainer />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Grid>
      </Grid>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Admin from "./Admin/App";
import Links from "./routes";

function App() {

  return (
    <Routes>
      <Route path="/*" element={< Links />} />
      <Route path="/Admin/*" element={<Admin />} />
    </Routes>
  );
}

export default App;

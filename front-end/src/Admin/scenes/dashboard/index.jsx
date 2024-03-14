import { Box } from "@mui/material";
import Header from "../../components/Header";

const Dashboard = () => {
  console.log(localStorage.getItem("token"));

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Hello Admin" subtitle="Welcome to your dashboard" />
      </Box>
    </Box>
  );
};

export default Dashboard;

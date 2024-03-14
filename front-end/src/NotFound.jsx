import { Box, Typography } from "@mui/material";
import React from "react";

const NotFound = () => {
  return (
    <Box>
      <Typography align="right" variant="h1">
        Page Not Found
      </Typography>
      <Typography variant="h3">
        The requested page could not be found.
      </Typography>
    </Box>
  );
};

export default NotFound;

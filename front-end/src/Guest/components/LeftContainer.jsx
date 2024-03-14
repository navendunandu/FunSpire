import { Box } from "@mui/material";
import React from "react";
import Lottie from "react-lottie";
import * as animationData from "../data/animation_lls17ahp.json";

export const LeftContainer = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Box>
      <Lottie options={defaultOptions} height={400}></Lottie>
    </Box>
  );
};

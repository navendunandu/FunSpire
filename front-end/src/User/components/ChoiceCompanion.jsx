import React from "react";
import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

const ChoiceCompanion = ({ val }) => {
  return (
    <Grid>
      <Typography>Are you going alone or with friends</Typography>
      <FormControl
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="female"
            control={<Radio />}
            label="Alone"
            onClick={(e) => val(e.target.value)}
          />
          <FormControlLabel
            value="male"
            control={<Radio />}
            label="Friends"
            onClick={(e) => val(e.target.value)}
          />
        </RadioGroup>
      </FormControl>
    </Grid>
  );
};

export default ChoiceCompanion;

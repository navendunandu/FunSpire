import React from "react";
import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

const ChoiceArea = ({ val }) => {
  return (
    <Grid>
      <Typography>Would you preffer indoor or outdoor?</Typography>
      <FormControl
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="Indoor"
            control={<Radio />}
            label="Indoor"
            onClick={(e) => val(e.target.value)}
          />
          <FormControlLabel
            value="Outdoor"
            control={<Radio />}
            label="Outdoor"
            onClick={(e) => val(e.target.value)}
          />
        </RadioGroup>
      </FormControl>
    </Grid>
  );
};

export default ChoiceArea;

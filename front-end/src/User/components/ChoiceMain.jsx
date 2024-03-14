import React from "react";
import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

const ChoiceMain = ({ val }) => {
  return (
    <Grid>
      <Typography variant="h6">Which one do you prefer?</Typography>
      <FormControl
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="events"
            control={<Radio />}
            label="Events"
            onClick={(e) => val(e.target.value)}
          />
          <FormControlLabel
            value="activities"
            control={<Radio />}
            label="Activities"
            onClick={(e) => val(e.target.value)}
          />
        </RadioGroup>
      </FormControl>
    </Grid>
  );
};

export default ChoiceMain;

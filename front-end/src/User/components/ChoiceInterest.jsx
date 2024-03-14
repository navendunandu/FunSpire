import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";
import {
  OutdoorEvents,
  IndoorEvents,
  IndoorActivity,
  OutdoorActivity,
} from "../data/data";

const ChoiceInterest = ({ val, area, type }) => {
  console.log(OutdoorEvents);

  return (
    <Grid>
      <Typography>What is your interest?</Typography>
      <FormControl
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {area === "Outdoor" && type === "events" && (
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            {OutdoorEvents.map((EventsOut) => (
              <FormControlLabel
                value={EventsOut.value}
                control={<Radio />}
                label={EventsOut.name}
                onClick={(e) => val(e.target.value)}
              />
            ))}
          </RadioGroup>
        )}

        {area === "Indoor" && type === "events" && (
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            {IndoorEvents.map((EventsIn) => (
              <FormControlLabel
                value={EventsIn.value}
                control={<Radio />}
                label={EventsIn.name}
                onClick={(e) => val(e.target.value)}
              />
            ))}
          </RadioGroup>
        )}

        {area === "Indoor" && type === "activities" && (
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            {IndoorActivity.map((ActIn) => (
              <FormControlLabel
                value={ActIn.value}
                control={<Radio />}
                label={ActIn.name}
                onClick={(e) => val(e.target.value)}
              />
            ))}
          </RadioGroup>
        )}

        {area === "Outdoor" && type === "activities" && (
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            {OutdoorActivity.map((OutIn) => (
              <FormControlLabel
                value={OutIn.value}
                control={<Radio />}
                label={OutIn.name}
                onClick={(e) => val(e.target.value)}
              />
            ))}
          </RadioGroup>
        )}
      </FormControl>
    </Grid>
  );
};

export default ChoiceInterest;

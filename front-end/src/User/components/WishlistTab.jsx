import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardView from "./CardView";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const WishlistTab = () => {
  const token = localStorage.getItem("token");
  const [value, setValue] = useState(0);
  const [activities, setActivities] = useState([]);
  const [events, setEvents] = useState([]);
  const array1 = [];
  console.log(token);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const wishlistActivity = () => {
    axios
      .get(`http://localhost:5000/activitywishlist`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((response) => {
        setActivities(response.data);
      });
  };

  const wishlistEvent = () => {
    axios
      .get(`http://localhost:5000/eventswishlist`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((response) => {
        setEvents(response.data);
      });
  };
  useEffect(() => {
    wishlistEvent();
    wishlistActivity();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4">Wishlist</Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Activities" {...a11yProps(0)} />
          <Tab label="Events" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {activities.map((Events, index) => (
          // <Typography>{Events.activityname}</Typography>
          <CardView key={index} card={Events} />
        ))}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {events.map((Events, index) => (
          <CardView key={index} card={Events} />
        ))}
      </CustomTabPanel>
    </Box>
  );
};

export default WishlistTab;

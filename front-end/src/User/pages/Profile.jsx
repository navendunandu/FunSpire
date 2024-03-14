import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import MyProfile from "../components/MyProfile";
import { events } from "../data/data";
import CardView from "../components/CardView";
import "../style/style.css";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import WishlistTab from "../components/WishlistTab";

const Profile = () => {

  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Grid container>
      <Grid item xs={6}>
        <MyProfile />
      </Grid>
      <Grid item xs={6}>
        <Grid className="u-profile_Container-right">
        <WishlistTab />

          
         
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Profile;

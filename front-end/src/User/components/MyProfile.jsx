import { Container, Typography, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

const MyProfile = () => {

  const [profile, setProfile] = useState([]);
  const token = localStorage.getItem("token");

  const userFetch = () => {
    axios.get(`http://localhost:5000/userprofile`, {
      headers: {
        "x-access-token": token,
      },
    })
    .then((response)=> {
      setProfile(response.data)
    })
  };

  useEffect(() => {
    userFetch();
  }, []);

  console.log(profile);
  const paperStyle = {
    padding: "20px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    marginTop: "3rem",
  };

  const labelStyle = {
    fontWeight: "bold",
    marginRight: "4px",
  };

  return (
    <Container maxWidth="sm" sx={{ display: "flex" }}>
      <Paper elevation={3} style={paperStyle}>
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <span style={labelStyle}>Name:</span> {profile.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <span style={labelStyle}>Email:</span> {profile.email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <span style={labelStyle}>Number:</span> {profile.number}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <span style={labelStyle}>Pincode:</span> {profile.pincode}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <span style={labelStyle}>Address:</span> {profile.address}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default MyProfile;

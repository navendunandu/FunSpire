import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import CardView from "../components/CardView";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { L, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import customIconUrl from "./loc.png";

const Dashboard = () => {
  const [selectedLatitude, setSelectedLatitude] = useState("51.509865");
  const [selectedLongtitude, setSelectedLongtitude] = useState("-0.118092");
  const token = localStorage.getItem("token");
  const [cardData, setCardData] = useState([]);

  const navigate = useNavigate();
  const customIcon = new Icon({
    iconUrl: customIconUrl, // Path to your custom icon image
    iconSize: [32, 32], // Width and height of the icon
    iconAnchor: [16, 32], // Anchor point (where the icon is positioned)
  });

  const userFetch = () => {
    axios
      .get(`http://localhost:5000/userprofile`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((response) => {
        setSelectedLatitude(response.data.latitude);
        setSelectedLongtitude(response.data.longtitude);
      });
  };

  const fetchCard = () => {
    axios
      .get(`http://localhost:5000/results`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((response) => {
        setCardData(response.data);
      });
  };

  const showAll = () => {
    axios.get("http://localhost:5000/event").then((response) => {
      const modifiedDataEvent = response.data.map((item) => ({
        ...item,
      }));

      axios.get("http://localhost:5000/activity").then((response) => {
        const modifiedDataActivity = response.data.map((item) => ({
          ...item,
        }));

        const combinedData = [...modifiedDataEvent, ...modifiedDataActivity];
        setCardData(combinedData);
      });
    });
  };

  useLayoutEffect(() => {
    fetchCard();
    userFetch();
  }, []);

  const deleteIntrest = () => {
    navigate("Questions");
  };
  console.log(cardData);
  return (
    <Grid>
      <Typography variant="h5" align="center">
        Following are the FunSpire Recomendation.....
      </Typography>
      <Typography variant="h5" align="center">
        Have Fun !!
      </Typography>
      <Box display={"flex"} justifyContent={"center"} gap={"2rem"}>
        <Button onClick={showAll}>Show All</Button>
        <Button onClick={deleteIntrest}>Restart Search</Button>
      </Box>
      <Grid container spacing={1} sx={{ padding: "20px" }}>
        <Grid item xs={6}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={2}
            sx={{ margin: "0 10px" }}
          >
            {cardData.map((Events) => (
              <CardView card={Events} />
            ))}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <MapContainer
            center={[selectedLatitude, selectedLongtitude]}
            zoom={5}
            style={{ height: "400px", width: "600px" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[selectedLatitude, selectedLongtitude]}
              icon={customIcon}
            >
              <Tooltip direction="bottom" opacity={1} permanent>
                This is ME😄
              </Tooltip>
            </Marker>
            {cardData.map((mapPoint) => (
              <Marker
                key={mapPoint._id} // Make sure to provide a unique key
                position={[mapPoint.latitude, mapPoint.longtitude]} // Use the correct property names (latitude and longitude)
                icon={customIcon}
              >
                <Tooltip direction="bottom" opacity={1} permanent>
                  {mapPoint.activityname
                    ? mapPoint.activityname
                    : mapPoint.Eventname}
                </Tooltip>
              </Marker>
            ))}
          </MapContainer>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;

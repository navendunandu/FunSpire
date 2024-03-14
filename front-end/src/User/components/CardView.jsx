import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { Box, Button, Typography, Fade, Modal, Backdrop } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import axios from "axios";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { L, Icon } from "leaflet";
import customIconUrl from "./loc.png";
import dummyPhoto from "../data/dummy.jpg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  bgcolor: "#e5e8ffed",
  border: "none",
  boxShadow: 24,
  p: 4,
  display: "flex",
  gap: "2rem",
};

const CardView = ({ card }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //check liked or not
  const [check, setCheck] = useState(false);
  const token = localStorage.getItem("token");

  const customIcon = new Icon({
    iconUrl: customIconUrl, // Path to your custom icon image
    iconSize: [32, 32], // Width and height of the icon
    iconAnchor: [16, 32], // Anchor point (where the icon is positioned)
  });

  const handleFavorite = (id) => {
    const data = {
      activityid: id,
    };
    if (check === false) {
      axios
        .post(`http://localhost:5000/activitywishlist`, data, {
          headers: {
            "x-access-token": token,
          },
        })
        .then((response) => {
          console.log(response.data);
        });
      setCheck(true);
    } else {
      axios
        .delete(`http://localhost:5000/activitywishlist/${id.$oid}`, {
          headers: {
            "x-access-token": token,
          },
        })
        .then((response) => {
          console.log(response.data);
        });
      setCheck(false);
      console.log(check);
    }
  };

  const handleFavoriteEvent = (id) => {
    const data = {
      eventid: id,
    };
    if (check === false) {
      axios
        .post(`http://localhost:5000/eventwishlist`, data, {
          headers: {
            "x-access-token": token,
          },
        })
        .then((response) => {
          console.log(response.data);
        });
      setCheck(true);
    } else {
      axios
        .delete(`http://localhost:5000/eventwishlist/${id.$oid}`, {
          headers: {
            "x-access-token": token,
          },
        })
        .then((response) => {
          console.log(response.data);
        });
      setCheck(false);
    }
  };
  const fetchWishdata = () => {
    axios
      .get(`http://localhost:5000/checkwishlist/${card._id.$oid}`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((response) => {
        setCheck(response.data.message);
      });
  };

  useEffect(() => {
    fetchWishdata();
  }, []);
  if (card.photo) {
    console.log(true);
  } else {
    console.log(false);
  }
  return (
    <>
      <Card sx={{ maxWidth: 500 }}>
        <Grid container>
          <Grid item xs={5}>
            {card.photo ? (
              <CardMedia
                component="img"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                image={`http://localhost:5000/uploads/${card.photo}`}
                alt="Image"
              />
            ) : (
              <CardMedia
                component="img"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                image={dummyPhoto}
                alt="Image"
              />
            )}
          </Grid>
          <Grid item xs={7}>
            <CardHeader
              title={card.activityname ? card.activityname : card.Eventname}
              subheader={card.area}
            />
            <CardHeader subheader={card.hours} sx={{ paddingTop: "0" }} />

            <CardActions disableSpacing>
              <IconButton
                aria-label="add to favorites"
                onClick={(id) => {
                  if (card.activityname) {
                    handleFavorite(card._id);
                  } else {
                    handleFavoriteEvent(card._id);
                  }
                }}
              >
                {check ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </CardActions>
            <CardActions disableSpacing>
              <Button onClick={handleOpen}>Show More</Button>
            </CardActions>
          </Grid>
        </Grid>
      </Card>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box sx={{ width: "300px" }}>
              <Typography color="text.secondary">Name</Typography>
              <Typography variant="h5" component="div">
                {card.activityname ? card.activityname : card.Eventname}
              </Typography>
              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                Activity Area
              </Typography>
              <Typography variant="h5" component="div">
                {card.area}
              </Typography>

              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                Address
              </Typography>
              <Typography variant="h5" component="div">
                {card.address}
                <br />
                {card.pindode}
              </Typography>
              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                Ticket PRice
              </Typography>
              <Typography variant="h5" component="div">
                {card.price}
              </Typography>
              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                Opening Hours
              </Typography>
              <Typography variant="h5" component="div">
                {card.hours}
              </Typography>
              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                Opening Days
              </Typography>
              <Typography variant="h5" component="div">
                {card.days}
              </Typography>
              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                Contact
              </Typography>
              <Typography variant="h5" component="div">
                {card.contact}
              </Typography>
              <Typography variant="h5" m="5px" component="div">
                <Button
                  color="secondary"
                  variant="text"
                  href={`http://${card.site}`}
                >
                  Website
                </Button>
              </Typography>
            </Box>
            <Box>
              <img
                src={`http://localhost:5000/uploads/${card.photo}`}
                height="150px"
              />
              <MapContainer
                center={[card.latitude, card.longtitude]}
                zoom={13}
                style={{ height: "400px", width: "600px" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  position={[card.latitude, card.longtitude]}
                  icon={customIcon}
                />
              </MapContainer>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default CardView;

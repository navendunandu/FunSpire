import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Select,
  TextField,
  MenuItem,
  Input,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ActivityArea = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [hours, setHours] = useState("");
  const [days, setDays] = useState("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");
  const [site, setSite] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [contact, setContact] = useState("");
  const [typelist, setTypeList] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [resultLoc, setResultLoc] = useState([]);

  const [pinValid, setPinValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);
  const [typeValid, setTypeValid] = useState(true);
  const [hourValid, setHourValid] = useState(true);
  const [daysValid, setDaysValid] = useState(true);
  const [areaValid, setAreaValid] = useState(true);
  const [priceValid, setPriceValid] = useState(true);
  const [siteValid, setSiteValid] = useState(true);
  const [addressValid, setAddressValid] = useState(true);
  const [contactValid, setContactValid] = useState(true);

  function getCoordinates(pin) {
    setPincode(pin);
    try {
      axios
        .get(`https://nominatim.openstreetmap.org/search`, {
          params: {
            format: "json",
            postalcode: pin,
            country: "GB", // United Kingdom country code
          },
        })
        .then((response) => {
          setResultLoc(response.data[0]);
        });
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  }

  const showDetails = () => {
    const formData = new FormData();
    formData.append("activityname", name);
    formData.append("hours", hours);
    formData.append("days", days);
    formData.append("type", type);
    formData.append("area", area);
    formData.append("price", price);
    formData.append("site", site);
    formData.append("address", address);
    formData.append("pindode", pincode);
    formData.append("contact", contact);
    formData.append("photo", photo);
    formData.append("latitude", resultLoc.lat);
    formData.append("longtitude", resultLoc.lon);
    console.log(photo);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios
      .post("http://localhost:5000/activity", formData, config)
      .then((response) => {
        console.log(response.data);
        setName("");
        setType("");
        setHours("");
        setDays("");
        setArea("");
        setPrice("");
        setSite("");
        setAddress("");
        setPincode("");
        setContact("");
        setResultLoc("");
        toast.success("Added Successfully !", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };
  const validateUKPostcode = () => {
    const postcodePattern = /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/i;
    // const regex = /^0\d{9}$/;
    let isValid = true;

    if (postcodePattern.test(pincode)) {
      // Valid postcode
      setPinValid(true);
    } else {
      // Invalid postcode
      setPinValid(false);
      isValid = false;
    }
    if (name === "") {
      isValid = false;
      setNameValid(false);
    }
    if (hours === "") {
      isValid = false;
      setHourValid(false);
    }
    if (days === "") {
      isValid = false;
      setDaysValid(false);
    }
    if (type === "") {
      isValid = false;
      setTypeValid(false);
    }
    if (area === "") {
      isValid = false;
      setAreaValid(false);
    }
    if (price === "") {
      isValid = false;
      setPriceValid(false);
    }
    if (site === "") {
      isValid = false;
      setSiteValid(false);
    }
    if (address === "") {
      isValid = false;
      setAddressValid(false);
    }
    // if (!regex.test(contact)) {
    //   isValid = false;
    //   setContactValid(false);
    // }
    if (isValid) {
      showDetails();
    }
  };

  const fetchType = () => {
    axios.get("http://localhost:5000/activitytype").then((response) => {
      const modifiedData = response.data.map((item) => ({
        ...item,
        _id: item._id.$oid, // Use the actual ID value
      }));
      setTypeList(modifiedData);
    });
  };
  useEffect(() => {
    fetchType();
  }, []);

  return (
    <Box m="20px">
      <Header title="Activities" />
      <Box display="flex" flexDirection="column" gap="1rem" width="1000px">
        <Box display="flex" flexDirection="row" gap="1rem">
          <TextField
            fullWidth
            color="secondary"
            varient="outlined"
            type="text"
            label="Name of the Activity"
            name="activitytype_name"
            style={{ height: "50px" }}
            onChange={(e) => {
              setName(e.target.value);
              setNameValid(true);
            }}
            error={!nameValid}
            helperText={!nameValid ? "Please enter your name." : ""}
          />
          <TextField
            fullWidth
            color="secondary"
            varient="outlined"
            type="text"
            label="Opening Hours"
            name="opening_hours"
            onChange={(e) => {
              setHours(e.target.value);
              setHourValid(true);
            }}
            error={!hourValid}
            helperText={!hourValid ? "Please enter the time." : ""}
          />
          <TextField
            fullWidth
            color="secondary"
            varient="outlined"
            type="text"
            label="Opening Days"
            name="opening_days"
            onChange={(e) => {
              setDays(e.target.value);
              setDaysValid(true);
            }}
            error={!daysValid}
            helperText={!daysValid ? "Please enter the date." : ""}
          />
        </Box>
        <Box display="flex" flexDirection="row" gap="1rem">
          <FormControl fullWidth>
            <InputLabel color="secondary" id="demo-simple-select-label">
              Activity Type
            </InputLabel>
            <Select
              color="secondary"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Activity Type"
              onChange={(e) => {
                setType(e.target.value);
                setTypeValid(true);
              }}
              error={!typeValid}
              helperText={!typeValid ? "Please select the type." : ""}
            >
              {typelist.map((list) => (
                <MenuItem value={list._id} key={list._id}>
                  {list.activitytype_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            color="secondary"
            varient="outlined"
            type="text"
            label="Ticket Price"
            name="activity_price"
            onChange={(e) => {
              setPrice(e.target.value);
              setPriceValid(true);
            }}
            error={!priceValid}
            helperText={!priceValid ? "Please enter the price." : ""}
          />
          <TextField
            fullWidth
            color="secondary"
            varient="outlined"
            type="text"
            label="Website"
            name="activity_site"
            onChange={(e) => {
              setSite(e.target.value);
              setSiteValid(true);
            }}
            error={!siteValid}
            helperText={!siteValid ? "Please enter the website." : ""}
          />
        </Box>
        <Box display="flex" flexDirection="row" gap="1rem">
          <TextField
            fullWidth
            color="secondary"
            varient="outlined"
            type="text"
            label="Address"
            name="activity_address"
            onChange={(e) => {
              setAddress(e.target.value);
              setAddressValid(true);
            }}
            error={!addressValid}
            helperText={!addressValid ? "Please enter the address." : ""}
          />
          <TextField
            fullWidth
            color="secondary"
            varient="outlined"
            type="text"
            label="Pincode"
            name="activity_pincode"
            onChange={(e) => {
              getCoordinates(e.target.value);
              setPinValid(true);
            }}
            value={pincode}
            error={!pinValid}
            helperText={
              !pinValid
                ? "Invalid postcode. Please enter a valid postcode."
                : ""
            }
          />
          <TextField
            fullWidth
            color="secondary"
            varient="outlined"
            type="text"
            label="Contact"
            name="activity_contact"
            onChange={(e) => {
              setContact(e.target.value);
              setContactValid(true);
            }}
            error={!contactValid}
            helperText={!contactValid ? "Please enter a valid number." : ""}
          />
        </Box>
        <Box display="flex" flexDirection="row" gap="1rem">
          <FormControl color="secondary">
            <FormLabel color="secondary" id="demo-radio-buttons-group-label">
              Activity Area
            </FormLabel>
            <RadioGroup
              color="secondary"
              row
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="Indoor"
                control={<Radio color="secondary" />}
                label="Indoor"
                color="secondary"
                onChange={(e) => {
                  setArea(e.target.value);
                }}
              />
              <FormControlLabel
                value="Outdoor"
                control={<Radio color="secondary" />}
                label="Outdoor"
                color="secondary"
                onChange={(e) => setArea(e.target.value)}
              />
            </RadioGroup>
          </FormControl>
          <Input
            type="file"
            id="file-input"
            onChange={(e) => setPhoto(e.target.files[0])}
            style={{ display: "none" }}
          />
          <label htmlFor="file-input">
            <Button
              variant="contained"
              component="span"
              startIcon={<InsertPhotoIcon />}
              color="secondary"
            >
              {photo === null ? "Upload Photo" : "Photo Selected"}
            </Button>
          </label>
        </Box>
        <Box display="flex" flexDirection="row" gap="1rem">
          <Button
            variant="contained"
            type="submit"
            color="secondary"
            onClick={validateUKPostcode}
          >
            Submit Activity
          </Button>
        </Box>
      </Box>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Box>
  );
};

export default ActivityArea;

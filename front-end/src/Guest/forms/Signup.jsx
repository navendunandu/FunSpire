import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCPass] = useState("");
  const [pin, setPin] = useState("");
  const [pinValid, setPinValid] = useState(true);
  const [resultLoc, setResultLoc] = useState([]);
  const [validEmail, setValidEmail] = useState(true);
  const [validName, setValidName] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const [validPass, setValidPass] = useState(true);
  const [validCPass, setValidCPass] = useState(true);

  const navigate = useNavigate();

  const validateUKPostcode = () => {
    // Regular expression pattern for UK postcodes
    const postcodePattern = /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/i;
    const regex = /^0\d{9}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    var valid = true;
    if (postcodePattern.test(pin)) {
      // Valid postcode
      setPinValid(true);
    } else {
      // Invalid postcode
      setPinValid(false);
      valid = false;
    }
    if (regex.test(number)) {
      setValidPhone(true);
    } else {
      setValidPhone(false);
      valid = false;
    }
    if (name === "") {
      setValidName(false);
      valid = false;
    }
    if (email === "") {
      setValidEmail(false);
      valid = false;
    }
    if (passwordPattern.test(pass)) {
      setValidPass(true);
    } else {
      setValidPass(false);
      valid = false;
    }
    if (cpass === "") {
      setValidCPass(false);
      valid = false;
    } else if (pass === cpass) {
      setValidCPass(true);
    } else {
      setValidCPass(false);
      valid = false;
    }
    if (valid) {
      UserReg();
    }
  };

  function getCoordinates(pin) {
    setPin(pin);
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
          // return response.data;
          // console.log(response.data);
          setResultLoc(response.data[0]);
          // console.log(response.data[0]);
        });
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  }

  const UserReg = () => {
    const newActivity = {
      //activitytype_id: rows.length + 1,
      name: name,
      email: email,
      number: number,
      password: pass,
      pincode: pin,
      status: 0,
      longtitude: resultLoc.lon,
      latitude: resultLoc.lat,
    };
    console.log(newActivity);
    axios.post("http://localhost:5000/user", newActivity).then((response) => {
      console.log(response.data);
      toast.success("Registration Successfully !", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    });
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap="1.5rem"
      sx={{ maxWidth: "500px" }}
    >
      <Typography variant="h3">Sign Up</Typography>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        required
        fullWidth
        value={name}
        color="success"
        onChange={(e) => {
          setName(e.target.value);
          setValidName(true);
        }}
        error={!validName}
        helperText={!validName ? "Please enter Name." : ""}
      />
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        fullWidth
        required
        value={email}
        color="success"
        onChange={(e) => {
          setEmail(e.target.value);
          setValidEmail(true);
        }}
        error={!validEmail}
        helperText={!validEmail ? "Please enter Email." : ""}
      />
      <TextField
        id="outlined-basic"
        label="Phone"
        variant="outlined"
        fullWidth
        required
        value={number}
        color="success"
        onChange={(e) => {
          setNumber(e.target.value);
          setValidPhone(true);
        }}
        error={!validPhone}
        helperText={!validPhone ? "Please enter valid Phone number." : ""}
      />
      <Box display={"flex"} gap={"1.3rem"}>
        <FormControl variant="outlined">
          <InputLabel color="warning" htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            fullWidth
            color="success"
            onChange={(e) => {
              setPass(e.target.value);
              setValidPass(true);
            }}
            value={pass}
            type="password"
            label="Password"
            error={!validPass}
            helperText={
              !validPass
                ? "Password must be at least 8 characters with at least one letter and one digit."
                : ""
            }
          />
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel color="warning" htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            fullWidth
            color="success"
            onChange={(e) => {
              setCPass(e.target.value);
              setValidCPass(true);
            }}
            value={cpass}
            type="password"
            label="Confirm Password"
            error={!validCPass}
            helperText={!validCPass ? "Please Doesn't Match." : ""}
          />
        </FormControl>
      </Box>
      <Box display={"flex"} gap={"1.3rem"}>
        <TextField
          id="outlined-basic"
          label="Pin Code"
          variant="outlined"
          fullWidth
          required
          value={pin}
          color="success"
          onChange={(e) => {
            getCoordinates(e.target.value);
            setPinValid(true);
          }}
          error={!pinValid}
          helperText={
            !pinValid ? "Invalid postcode. Please enter a valid postcode." : ""
          }
        />
      </Box>
      <Button color="success" onClick={validateUKPostcode} variant="contained">
        Register
      </Button>
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
        theme="light"
      />
    </Box>
  );
};

export default Signup;

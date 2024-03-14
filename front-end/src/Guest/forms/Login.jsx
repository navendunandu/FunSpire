import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [validPw, setValidPw] = useState(true);

  const validator = () => {
    var valid = true;
    if (email === "") {
      setValidEmail(false);
      valid = false;
    }
    if (password === "") {
      setValidPw(false);
      valid = false;
    }
    if (valid) {
      inputData();
    }
  };

  const inputData = () => {
    if (email === "admin@gmail.com" && password === "admin@123") {
      navigate("../Admin/");
    } else {
      axios
        .get(`http://localhost:5000/login/${email}/${password}`)
        .then((response) => {
          // var data = response.data.district;
          console.log(response.data);
          if (response.data.login === "users") {
            localStorage.setItem("token", response.data.token);
            navigate("../User/");
          } else if (response.data.login === "user") {
            localStorage.setItem("token", response.data.token);
            navigate("../User/Questions");
          } else {
            alert("Invalid Credentials !!!");
          }
        });
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap="1.5rem"
      sx={{ maxWidth: "500px" }}
    >
      <Typography variant="h3">Login</Typography>
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        fullWidth
        color="success"
        onChange={(event) => {
          setEmail(event.target.value);
          setValidEmail(true);
        }}
        error={!validEmail}
        helperText={!validEmail ? "Please enter Email." : ""}
      />
      <FormControl variant="outlined">
        <InputLabel color="warning" htmlFor="outlined-adornment-password">
          Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          fullWidth
          color="success"
          onChange={(event) => {
            setPassword(event.target.value);
            setValidPw(true);
          }}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          error={!validPw}
          helperText={!validPw ? "Please enter Password." : ""}
        />
      </FormControl>
      <Button color="success" variant="contained" onClick={validator}>
        LOGIN
      </Button>
    </Box>
  );
};

export default Login;

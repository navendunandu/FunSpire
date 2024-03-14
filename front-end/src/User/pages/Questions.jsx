import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import ChoiceMain from "../components/ChoiceMain";
import ChoiceArea from "../components/ChoiceArea";
import ChoiceInterest from "../components/ChoiceInterest";
import ChoiceCompanion from "../components/ChoiceCompanion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const steps = [
  " Account Details",
  "Personal Info",
  "Review and Submit",
  " Account Details",
];

const Questions = () => {
  //Preferences States
  const [mainC, setMainC] = useState("");
  const [areaC, setAreaC] = useState("");
  const [interestC, setInterestC] = useState("");
  const [companionC, setCompanionC] = useState("");

  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  console.log(mainC);
  console.log(areaC);
  console.log(interestC);
  console.log(companionC);

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const onNext = () => {
    if (activeStep === steps.length - 1) {
      console.log("last step");
    } else {
      if (activeStep === 0 && mainC === "") {
        toast.error("Please select your choice !", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (activeStep === 1 && areaC === "") {
        toast.error("Please select your choice !", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (activeStep === 2 && interestC === "") {
        toast.error("Please select your choice !", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (activeStep === 3 && companionC === "") {
        toast.error("Please select your choice !", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setActiveStep((prevStep) => prevStep + 1);
      }
    }
  };
  const token = localStorage.getItem("token");
  const onSubmit = () => {
    axios
      .delete(`http://localhost:5000/deleteIntrest`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((response) => {});

    const data = {
      typeofintrest: mainC,
      areaofinterest: areaC,
      interst: interestC,
      companion: companionC,
    };
    axios
      .post(`http://localhost:5000/interest`, data, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((response) => {
        console.log(response.data);
      });
    navigate("/user");
  };

  const formContent = (step) => {
    switch (step) {
      case 0:
        return <ChoiceMain val={setMainC} />;
      case 1:
        return <ChoiceArea val={setAreaC} />;
      case 2:
        return <ChoiceInterest val={setInterestC} area={areaC} type={mainC} />;
      case 3:
        return <ChoiceCompanion val={setCompanionC} />;
      default:
        return <div>404: Not Found</div>;
    }
  };

  return (
    <Grid
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyItems={"center"}
      p={2}
    >
      <Grid>
        <Typography variant="h4">
          Help us to decide what you're looking for
        </Typography>
      </Grid>
      <Grid
        container
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyItems={"center"}
      >
        <Grid item xs={12} sx={{ padding: "20px" }}>
          {formContent(activeStep)}
        </Grid>

        <Grid item xs={12}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button onClick={onSubmit}>Submit</Button>
          ) : (
            <Button onClick={onNext}>Next</Button>
          )}
        </Grid>
      </Grid>
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
    </Grid>
  );
};

export default Questions;

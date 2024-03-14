import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { DeleteOutline } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventType = () => {
  const [EventName, setEventName] = useState("");
  const [rows, setRows] = useState([]);
  const [typeValid, setTypeValid] = useState(true);
  const rowsWithId = rows.map((row, index) => ({ ...row, id: index + 1 }));

  const validateType = () => {
    if (EventName === "") {
      setTypeValid(false);
    } else {
      handleAddEvent();
    }
  };

  const handleAddEvent = () => {
    if (EventName.trim() !== "") {
      const newEvent = {
        Eventtype_name: EventName,
      };
      axios
        .post("http://localhost:5000/eventtype", newEvent)
        .then((response) => {
          console.log(response.data);
          setEventName("");
          fetchData();
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
      setRows([...rows, newEvent]);
      setEventName("");
    }
    console.log(rows);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Eventtype_name",
      headerAlign: "center",
      headerName: "Event NAME",
      flex: 1,
      align: "center",
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="districtListDelete red"
              onClick={() => activityDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  const activityDelete = (e) => {
    axios.delete(`http://localhost:5000/eventtype/${e}`).then((response) => {
      fetchData();
      toast.success("Deleted Successfully !", {
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

  const fetchData = () => {
    axios.get("http://localhost:5000/eventtype").then((response) => {
      console.log(response.data);
      const modifiedData = response.data.map((item) => ({
        ...item,
        _id: item._id.$oid, // Use the actual ID value
      }));
      setRows(modifiedData);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box m="20px">
      <Header title="Event Type" />
      <Box display="flex" flexDirection="row" gap="1rem" width="400px" m="10px">
        <TextField
          fullWidth
          color="secondary"
          varient="outlined"
          type="text"
          label="Name of the Event Type"
          value={EventName}
          name="Eventtype_name"
          style={{ height: "50px" }}
          autoComplete="off"
          required
          onChange={(e) => {
            setEventName(e.target.value);
            setTypeValid(true);
          }}
          error={!typeValid}
          helperText={!typeValid ? "Please enter Activity Type." : ""}
        />
        <Box>
          <Button
            variant="contained"
            type="submit"
            color="secondary"
            style={{ height: "50px", width: "80px" }}
            onClick={validateType}
          >
            Add
          </Button>
        </Box>
      </Box>
      <Box m="10px">
        <Header title="Event Type Manager" />
        <Box style={{ height: "400px" }}>
          <DataGrid
            getRowId={(row) => row.id}
            rows={rowsWithId}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
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

export default EventType;

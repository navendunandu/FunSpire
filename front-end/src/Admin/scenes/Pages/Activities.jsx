import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Backdrop, Fade, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  bgcolor: "#4a53ae",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  gap: "2rem",
};

const Activities = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [activitydata, getactivitydata] = useState([]);
  const [modalData, setModalData] = useState([]);
  const fetchData = () => {
    axios.get("http://localhost:5000/activity").then((response) => {
      console.log(response.data);
      const modifiedData = response.data.map((item) => ({
        ...item,
        _id: item._id.$oid, // Use the actual ID value
        activitytype_name: item.typeinfo[0].activitytype_name,
      }));
      getactivitydata(modifiedData);
    });
  };
  const activityDelete = (e) => {
    axios.delete(`http://localhost:5000/activity/${e}`).then((response) => {
      handleClose();
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
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box m="1rem" sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {activitydata.map((list, index) => (
        <Card
          sx={{
            minWidth: 200,
            width: "fit-content",
            backgroundColor: "#4a53ae",
          }}
        >
          <CardContent>
            <Typography variant="h4" component="div">
              {list.activityname}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {list.area} ||{list.typeinfo[0].activitytype_name}
            </Typography>
            <Typography variant="body1">
              {list.address}
              <br />
              {list.contact}
              <br />
              {list.site}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => {
                setModalData(list);
                handleOpen();
              }}
              size="medium"
            >
              More...
            </Button>
          </CardActions>
        </Card>
      ))}

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
              <Typography variant="h4" component="div">
                {modalData.activityname}
              </Typography>
              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                Activity Area
              </Typography>
              <Typography variant="h4" component="div">
                {modalData.area}
              </Typography>
              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                Activity Type
              </Typography>
              <Typography variant="h4" component="div">
                {modalData.activitytype_name}
              </Typography>
              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                Address
              </Typography>
              <Typography variant="h4" component="div">
                {modalData.address}
                <br />
                {modalData.pindode}
              </Typography>
              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                Ticket Price
              </Typography>
              <Typography variant="h4" component="div">
                {modalData.price}
              </Typography>
              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                Opening Hours
              </Typography>
              <Typography variant="h4" component="div">
                {modalData.hours}
              </Typography>
              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                Opening Days
              </Typography>
              <Typography variant="h4" component="div">
                {modalData.days}
              </Typography>
              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                Contact
              </Typography>
              <Typography variant="h4" component="div">
                {modalData.contact}
              </Typography>
              <Typography variant="h4" m="5px" component="div">
                <Button
                  color="secondary"
                  variant="text"
                  href={`https://${modalData.site}`}
                >
                  Website
                </Button>
              </Typography>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteOutlineIcon />}
                onClick={() => activityDelete(modalData._id)}
              >
                Delete
              </Button>
            </Box>
            <Box>
              {modalData.photo && (
                <img
                  src={`http://localhost:5000/uploads/${modalData.photo}`}
                  height="300px"
                />
              )}
            </Box>
          </Box>
        </Fade>
      </Modal>
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

export default Activities;

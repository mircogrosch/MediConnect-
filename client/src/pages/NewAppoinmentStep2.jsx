import React, { useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { teal, grey } from "@mui/material/colors";
import AppBar from "../components/Notification/AppBarNoti";
import DoctorCard from "../componenets/NewAppoinment/Step2/DoctorCard";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import circleUser from "../img/user.png";

const hours = [
  {
    value: "08:00",
    available: true,
  },
  {
    value: "08:30",
    available: true,
  },
  {
    value: "09:00",
    available: false,
  },
  {
    value: "09:30",
    available: true,
  },
  {
    value: "10:00",
    available: false,
  },
  {
    value: "10:30",
    available: true,
  },
  {
    value: "11:00",
    available: false,
  },
  {
    value: "11:30",
    available: true,
  },
  {
    value: "12:00",
    available: true,
  },
  {
    value: "12:30",
    available: true,
  },
  {
    value: "13:00",
    available: true,
  },
  {
    value: "13:30",
    available: false,
  },
  {
    value: "14:00",
    available: false,
  },
  {
    value: "14:30",
    available: true,
  },
  {
    value: "15:00",
    available: false,
  },
  {
    value: "15:30",
    available: true,
  },
  {
    value: "16:00",
    available: false,
  },
  {
    value: "15:30",
    available: true,
  },
  {
    value: "17:00",
    available: true,
  },
];

function NewAppointmentStep2(props) {
  const [date, setDate] = useState(new Date());

  // const { name, lastname, imageProfile } = props.location.state;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: teal[100],
      }}
    >
      <AppBar bgColor={teal[900]} />
      <Box
        sx={{
          height: "90vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          display: "flex",
        }}
      >
        {/*  <DoctorCard 
          name={name} 
          lastname={lastname} 
          imageProfile={imageProfile} 
        />*/}
        <Grid
          container
          bgcolor={teal[600]}
          alignItems="center"
          sx={{ width: "70vw", padding: "0.5em 1em", borderRadius: "5px" }}
        >
          <Grid item xs={1}>
            <img src={circleUser} alt="circle user" style={{ width: "50px" }} />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" color={teal[50]}>
              Dhalgüin Hernández
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h6" color={teal[50]}>
              Cirujano Plástico
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              sx={{ width: "100%", height: "50px", bgcolor: teal[900] }}
            >
              Cambiar
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{ width: "70vw", padding: "0.5em 1em", borderRadius: "5px" }}
        >
          <Grid item xs={6}>
            <Calendar value={date} onChange={(value) => setDate(value)} />
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={1}>
              {hours.map((hour) => (
                <Grid item xs={3}>
                  <Box
                    sx={{
                      padding: "2px 5px",
                      border: `2px solid ${
                        hour.available ? teal[500] : grey[500]
                      }`,
                      borderRadius: "5px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      textAlign="center"
                      color={`${!hour.available && grey[500]}`}
                    >
                      {hour.value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default NewAppointmentStep2;

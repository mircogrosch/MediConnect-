import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import hours from "../utils/calendar_hours";
import { Box, Grid, Typography, Button } from "@mui/material";
import { teal } from "@mui/material/colors";
import AppBar from "../components/Notification/AppBarNoti";
import DoctorCard from "../components/newAppointment/Step2/DoctorCard";
import Calendar from "react-calendar";
import HourCard from "../components/newAppointment/Step2/HourCard";
import "react-calendar/dist/Calendar.css";

function NewAppointmentStep2(props) {
  const history = useHistory();
  const { id } = useParams();

  const [date, setDate] = useState(new Date());
  const [availableDays, setAvailableDays] = useState([]);
  const [allHours, setAllHours] = useState(hours);
  const [shiftsHours, setShiftsHours] = useState([]);

  const { idDoctor, name, lastname, image, specialities, work_days } =
    history.location.state.data;

  useEffect(() => {
    !availableDays.length &&
      work_days.forEach((e) =>
        setAvailableDays((prevState) => [...prevState, e.day])
      );
  }, [availableDays, work_days]);

  useEffect(() => {
    let selectedDay = work_days.find((day) => day.num === date.getDay());

    let initHour = selectedDay
      ? hours.findIndex((hour) => hour.value === selectedDay.init)
      : "0";
    let endHour = selectedDay
      ? hours.findIndex((hour) => hour.value === selectedDay.end) + 1
      : "0";

    setAllHours(arrayTimeResult(hours.slice(initHour, endHour), shiftsHours));
  }, [date, work_days, shiftsHours]);

  const saveShift = async (date) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/doctor/appointment/${idDoctor}?patient=${id}`,
        { date }
      );

      if (response.data.data) {
        swal({
          icon: "success",
          title: "Turno confirmado exitosamente",
          timer: 1500,
        });
      } else {
        swal({
          icon: "error",
          title: "Server Error",
          text: "Intentelo más tarde",
          timer: 1500,
        });
      }
    } catch (error) {
      alert(error);
      swal({
        icon: "error",
        title: "Server Error",
        text: "Intentelo más tarde",
        dangerMode: true,
        timer: 1500,
      });
    }
  };

  const handleCalendar = async (value) => {
    setDate(value);

    let day = value.getDate();
    let month = value.getMonth();
    let year = value.getFullYear();

    try {
      const response = await axios.get(
        `http://localhost:3001/doctor/appointmentByDay/${idDoctor}?day=${day}&month=${month}&year=${year}`
      );
      setShiftsHours(response.data.data);
    } catch (error) {
      alert(error);
    }
  };

  const arrayTimeResult = (allHours, shiftHours) => {
    let arrayHours = [...allHours];

    return arrayHours.map((hours) => {
      for (let a = 0; a < shiftHours.length; a++) {
        if (hours.show === shiftHours[a].hour_long) {
          return { ...hours, available: false };
        }
      }
      return { ...hours, available: true };
    });
  };

  const selectHour = (hour, mins) => {
    date.setHours(hour);
    date.setMinutes(mins);
  };

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
        <DoctorCard
          id={idDoctor}
          name={name}
          lastname={lastname}
          imageProfile={image}
          specialities={specialities}
          goBack={history.goBack}
        />
        <Grid
          container
          columnSpacing={2}
          sx={{ width: "70vw", padding: "0.5em 1em", borderRadius: "5px" }}
        >
          <Grid
            item
            xs={6}
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            display="flex"
          >
            <Calendar
              value={date}
              onChange={(value) => handleCalendar(value)}
            />
            <Typography variant="body1">{availableDays.join(" - ")}</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            display="flex"
          >
            <Grid container spacing={1}>
              {allHours.map((hour, index) => (
                <Grid item key={index} xs={3}>
                  <HourCard time={hour} selectHour={selectHour} />
                </Grid>
              ))}
            </Grid>
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={() => saveShift(date)}
            >
              Confirmar Turno
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default NewAppointmentStep2;

import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import axios from "axios";
import Calendar from "react-calendar";
import hours from "../../utils/calendar_hours";
import DoctorCard from "./Step2/DoctorCard";
import HourCard from "./Step2/HourCard";
import "react-calendar/dist/Calendar.css";

function NewAppointmentStep2({
  doctorData,
  setDateSelected,
  nextStep,
  previousStep,
}) {
  const [date, setDate] = useState(new Date());
  const [availableDays, setAvailableDays] = useState([]);
  const [allHours, setAllHours] = useState(hours);
  const [shiftsHours, setShiftsHours] = useState([]);

  const { idDoctor, name, lastname, image, specialities, work_days } =
    doctorData;

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

  const confirmDate = () => {
    setDateSelected(date);
    nextStep();
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
        height: "100%",
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
        previousStep={previousStep}
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
          display="flex"
        >
          <Calendar value={date} onChange={(value) => handleCalendar(value)} />
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
            onClick={() => confirmDate()}
          >
            Confirmar Turno
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default NewAppointmentStep2;

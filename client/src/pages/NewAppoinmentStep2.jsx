import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid, Typography, Button } from "@mui/material";
import { teal } from "@mui/material/colors";
import AppBar from "../components/Notification/AppBarNoti";
import DoctorCard from "../components/newAppointment/Step2/DoctorCard";
import Calendar from "react-calendar";
import HourCard from "../components/newAppointment/Step2/HourCard";
import "react-calendar/dist/Calendar.css";

const hours = [
  {
    hour: "01",
    mins: "00",
    value: "1:00",
    available: true,
  },
  {
    hour: "01",
    mins: "30",
    value: "1:30",
    available: true,
  },
  {
    hour: "02",
    mins: "00",
    value: "2:00",
    available: true,
  },
  {
    hour: "02",
    mins: "30",
    value: "2:30",
    available: true,
  },
  {
    hour: "03",
    mins: "00",
    value: "3:00",
    available: true,
  },
  {
    hour: "03",
    mins: "30",
    value: "3:30",
    available: true,
  },
  {
    hour: "04",
    mins: "00",
    value: "4:00",
    available: true,
  },
  {
    hour: "04",
    mins: "30",
    value: "4:30",
    available: true,
  },
  {
    hour: "05",
    mins: "00",
    value: "5:00",
    available: true,
  },
  {
    hour: "05",
    mins: "30",
    value: "5:30",
    available: true,
  },
  {
    hour: "6",
    mins: "00",
    value: "06:00",
    available: true,
  },
  {
    hour: "06",
    mins: "30",
    value: "6:30",
    available: true,
  },
  {
    hour: "07",
    mins: "00",
    value: "7:00",
    available: true,
  },
  {
    hour: "07",
    mins: "30",
    value: "7:30",
    available: true,
  },
  {
    hour: "08",
    mins: "00",
    value: "8:00",
    available: true,
  },
  {
    hour: "08",
    mins: "30",
    value: "8:30",
    available: true,
  },
  {
    hour: "09",
    mins: "00",
    value: "9:00",
    available: true,
  },
  {
    hour: "09",
    mins: "30",
    value: "9:30",
    available: true,
  },
  {
    hour: "10",
    mins: "00",
    value: "10:00",
    available: true,
  },
  {
    hour: "10",
    mins: "30",
    value: "10:30",
    available: true,
  },
  {
    hour: "11",
    mins: "00",
    value: "11:00",
    available: true,
  },
  {
    hour: "11",
    mins: "30",
    value: "11:30",
    available: true,
  },
  {
    hour: "12",
    mins: "00",
    value: "12:00",
    available: true,
  },
  {
    hour: "12",
    mins: "30",
    value: "12:30",
    available: true,
  },
  {
    hour: "13",
    mins: "00",
    value: "13:00",
    available: true,
  },
  {
    hour: "13",
    mins: "30",
    value: "13:30",
    available: true,
  },
  {
    hour: "14",
    mins: "00",
    value: "14:00",
    available: true,
  },
  {
    hour: "14",
    mins: "30",
    value: "14:30",
    available: true,
  },
  {
    hour: "15",
    mins: "00",
    value: "15:00",
    available: true,
  },
  {
    hour: "15",
    mins: "30",
    value: "15:30",
    available: true,
  },
  {
    hour: "16",
    mins: "00",
    value: "16:00",
    available: true,
  },
  {
    hour: "16",
    mins: "30",
    value: "16:30",
    available: true,
  },
  {
    hour: "17",
    mins: "00",
    value: "17:00",
    available: true,
  },
  {
    hour: "17",
    mins: "30",
    value: "17:30",
    available: true,
  },
  {
    hour: "18",
    mins: "00",
    value: "18:00",
    available: true,
  },
  {
    hour: "18",
    mins: "30",
    value: "18:30",
    available: true,
  },
  {
    hour: "19",
    mins: "00",
    value: "19:00",
    available: true,
  },
  {
    hour: "19",
    mins: "30",
    value: "19:30",
    available: true,
  },
  {
    hour: "20",
    mins: "00",
    value: "20:00",
    available: true,
  },
  {
    hour: "20",
    mins: "30",
    value: "20:30",
    available: true,
  },
  {
    hour: "21",
    mins: "00",
    value: "21:00",
    available: true,
  },
  {
    hour: "21",
    mins: "30",
    value: "21:30",
    available: true,
  },
  {
    hour: "22",
    mins: "00",
    value: "22:00",
    available: true,
  },
  {
    hour: "22",
    mins: "30",
    value: "22:30",
    available: true,
  },
  {
    hour: "23",
    mins: "00",
    value: "23:00",
    available: true,
  },
  {
    hour: "23",
    mins: "30",
    value: "23:30",
    available: true,
  },
];

const work_days = [
  {
    day: "Lun",
    num: 1,
    init: "1:00",
    end: "11:00",
  },
  {
    day: "Mar",
    num: 2,
    init: "10:30",
    end: "14:30",
  },
  {
    day: "Mie",
    num: 3,
    init: "7:00",
    end: "16:30",
  },
  {
    day: "Jue",
    num: 4,
    init: "8:00",
    end: "17:30",
  },
  {
    day: "Vie",
    num: 5,
    init: "5:00",
    end: "12:00",
  },
];

function NewAppointmentStep2(props) {
  const [date, setDate] = useState(new Date());
  const [availableDays, setAvailableDays] = useState([]);
  const [allHours, setAllHours] = useState(hours);

  const patientId = props.match.params.id;

  const {
    idDoctor,
    name,
    lastname,
    image,
    specialities,
    // work_days
  } = props.location.state.data;

  useEffect(() => {
    !availableDays.length &&
      work_days.forEach((e) =>
        setAvailableDays((prevState) => [...prevState, e.day])
      );
  }, [availableDays]);

  useEffect(() => {
    let selectedDay = work_days.find((day) => day.num === date.getDay());

    let initHour = hours.findIndex((hour) => hour.value === selectedDay.init);
    let endHour = hours.findIndex((hour) => hour.value === selectedDay.end) + 1;

    setAllHours(hours.slice(initHour, endHour));
  }, [date]);

  const saveShift = async (date) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/doctor/appointment/${idDoctor}?patient=${patientId}`,
        { date }
      );
      console.log(response.data);
    } catch (error) {
      alert(error);
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
      console.log(response.data.data);
    } catch (error) {
      alert(error);
    }
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
          goBack={props.history.goBack}
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
            justifyContent="space-between"
            display="flex"
          >
            <Calendar
              value={date}
              onChange={(value) => handleCalendar(value)}
            />
            <Typography variant="body1">{availableDays.join(" - ")}</Typography>
            {/* <Button variant="contained" onClick={() => selectDate(date)}>
              Seleccionar Fecha
            </Button> */}
          </Grid>
          <Grid
            item
            xs={6}
            flexDirection="column"
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
            <Button variant="contained" onClick={() => saveShift(date)}>
              Confirmar Turno
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default NewAppointmentStep2;

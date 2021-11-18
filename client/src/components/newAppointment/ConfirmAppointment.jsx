import React from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router";
import { Typography, Grid, Box, Button } from "@mui/material";
import { teal } from "@mui/material/colors";
import swal from "sweetalert";

function ConfirmAppointment({ dateSelected, doctorData, previousStep }) {
  const history = useHistory();
  const { id } = useParams();

  const doctorName = `${doctorData.name} ${doctorData.lastname}`;
  const date = `${dateSelected.getDate()}/${
    dateSelected.getMonth() + 1
  }/${dateSelected.getFullYear()}`;
  const time = `${dateSelected.getHours()}:${dateSelected.getMinutes()}`;

  const saveShift = async (date) => {
    console.log(date);
    console.log(doctorData.idDoctor);

    try {
      const response = await axios.post(
        `http://localhost:3001/doctor/appointment/${doctorData.idDoctor}?patient=${id}`,
        { date }
      );

      if (response.data.data) {
        swal({
          icon: "success",
          title: "Su turno fue agendado exitosamente",
          buttons: {
            1: {
              text: "Agendar nuevo Turno",
              value: true,
            },
            2: {
              text: "Terminar",
              value: false,
            },
          },
        }).then((value) => {
          value
            ? history.push(`/account/patient/schedule/${id}`)
            : history.push("/account/patient");
        });
      } else {
        swal({
          icon: "error",
          title: "Ha ocurrido un error",
          text: "Intentelo de nuevo",
          timer: 2000,
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

  return (
    <Box>
      <Grid container height="90vh" alignItems="center" justifyContent="center">
        <Box
          bgcolor={teal[100]}
          sx={{
            width: "60vw",
            height: "60vh",
            padding: "1em",
            borderRadius: "10px",
          }}
        >
          <Grid
            container
            height="100%"
            flexDirection="column"
            justifyContent="space-around"
          >
            <Typography variant="h3" textAlign="center" fontWeight="400">
              Estas a punto de agendar un nuevo turno
            </Typography>
            <Box>
              <Typography
                variant="h5"
                fontStyle="italic"
                marginBottom="0.6em"
                sx={{ textDecoration: "underline" }}
              >
                Datos del Turno
              </Typography>
              <Typography variant="body1">
                <strong>Doctor:</strong> {doctorName}
              </Typography>
              <Typography variant="body1">
                <strong>Especialdad:</strong> {doctorData.specialities}
              </Typography>
              <Typography variant="body1">
                <strong>Fecha:</strong> {date}
              </Typography>
              <Typography variant="body1">
                <strong>Hora:</strong> {time}
              </Typography>
            </Box>
            <Grid container justifyContent="space-around" width="100%">
              <Button
                variant="contained"
                onClick={() => previousStep()}
                sx={{ width: "45%", color: teal[900], background: teal[50] }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                onClick={() => saveShift(dateSelected)}
                sx={{ width: "45%" }}
              >
                Confirmar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}

export default ConfirmAppointment;

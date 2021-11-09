import React from "react";
import PrimarySearchAppBar from "../components/Notification/AppBarNoti";
import MaterialTable from "material-table";
import { Typography, Button } from "@mui/material";
import { teal } from "@mui/material/colors";
import { useStyles } from "../styles/registerForms/patient.js";
// import { makeStyles } from "@material-ui/core/styles";

const columnas = [
  { title: "Fecha", field: "fecha" },
  { title: "Hora", field: "hora" },
  { title: "Paciente", field: "paciente" },
  { title: "Estado de pago", field: "estado" },
  //     type: "numeric"
];
const data = [
  {
    fecha: "Vi 9 Nov",
    hora: "08:00",
    paciente: "Jorge Lanata",
    estado: "Abonado",
  },
  {
    fecha: "Ju 18 Nov",
    hora: "08:30",
    paciente: "Alberto Olmedo",
    estado: "Pendiente",
  },
  {
    fecha: "Vi 19 Nov",
    hora: "11:00",
    paciente: "Sebastian Mendoza",
    estado: "Abonado",
  },
  {
    fecha: "Lu 3 Dic",
    hora: "14:30",
    paciente: "Elisa Lopez",
    estado: "Abonado",
  },
];

const ScheduleDoctor = () => {
  const classes = useStyles();
  return (
    <>
      <PrimarySearchAppBar />
      <Typography variant="h4">Turnos pendientes</Typography>
      <MaterialTable
        columns={columnas}
        data={data}
        title={""}
        style={{ maxWidth: "80%" }}
        components={{
          Pagination: "disabled",
        }}
      />
      <Button
        variant="contained"
        className={classes.button}
        sx={{
          marginTop: "1em",
          fontSize: "14px",
          background: teal[900],
        }}
      >
        Configurar agenda
      </Button>
    </>
  );
};
export default ScheduleDoctor;

import React, { useState, useEffect } from "react";
import PrimarySearchAppBar from "../components/Notification/AppBarNoti";
import MaterialTable from "material-table";
import { Typography, Button, Grid } from "@mui/material";
import { teal, grey } from "@mui/material/colors";
import axios from "axios";

const columnas = [
  { title: "Fecha y hora", field: "date" },
  { title: "Nombre", field: "patient.person.name" },
  { title: "Apellido", field: "patient.person.lastname" },
  { title: "Estado de pago", field: "payment_status" },
];

const ScheduleDoctor = (props) => {
  const [data, setData] = useState([]);

  const getAppointments = async () => {
    const URL = "http://localhost:3001";
    const response = await axios.get(
      `${URL}/doctor/appointment/${props.match.params.id}`
    );
    setData(response.data.data);
    console.log(response.data.data);
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <>
      <Grid>
        <PrimarySearchAppBar />
      </Grid>
      <Grid
        container
        height="100vh"
        rowSpacing={1}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography align={"center"} variant="h5" style={{ color: grey[700] }}>
          Lista de turnos pendientes
        </Typography>
        <MaterialTable
          columns={columnas}
          data={data}
          title={""}
          style={{
            maxWidth: "80%",
            background: teal[50],
          }}
          components={{
            Pagination: "disabled",
          }}
        />
        <Button
          variant="contained"
          sx={{
            marginTop: "1em",
            fontSize: "14px",
            width: "80%",
            height: "50px",
            background: teal[900],
          }}
        >
          Configurar agenda
        </Button>
      </Grid>
    </>
  );
};
export default ScheduleDoctor;

import React, { useState, useEffect } from "react";
import PrimarySearchAppBar from "../components/Notification/AppBarNoti";
import { Typography, Button, Grid, Box } from "@mui/material";
import { teal, grey } from "@mui/material/colors";
import axios from "axios";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

const columnas = [
  { name: "Fecha", selector: "date", sortable: true },
  { name: "Hora", selector: "hour_long", sortable: true },
  //   { name: "Nombre", selector: "patient.person.name", sortable: true },
  //   { name: "Apellido", selector: "patient.person.lastname", sortable: true },
  { name: "Estado de pago", selector: "payment_status", sortable: true },
];
const SchedulePatient = (props) => {
  const [data, setData] = useState([]);

  //   const getAppointments = async () => {
  //     const URL = "http://localhost:3001";
  //     const response = await axios.get(
  //       `${URL}/doctor/appointment/${props.match.params.id}`
  //     );
  //     setData(response.data.data);
  //   };

  //   useEffect(() => {
  //     getAppointments();
  //   }, []);
  return (
    <>
      <Box sx={{ background: grey[50] }}>
        <PrimarySearchAppBar />
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            container
            height="70vh"
            rowSpacing={1}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              align={"center"}
              variant="h4"
              style={{ color: grey[700] }}
            >
              Lista de turnos
            </Typography>
            {data.length ? (
              <Grid
                style={{
                  marginTop: "1em",
                  width: "80%",
                  background: grey[100],
                  border: "solid 0.0005px ",
                  borderColor: teal[100],
                  fontFamily: "Roboto",
                }}
              >
                <DataTable
                  columns={columnas}
                  data={data}
                  title={""}
                  fixedHeader
                  fixedHeaderScrollHeight="400px"
                />
              </Grid>
            ) : (
              <Grid
                height="30vh"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  align={"center"}
                  variant="h6"
                  style={{ color: grey[700] }}
                >
                  No tiene ningún turno pendiente
                </Typography>
              </Grid>
            )}

            <Link
              to={`/account/patient/new-appointment/${props.match.params.id}`}
              style={{ textDecoration: "none", width: "80%" }}
            >
              <Button
                variant="contained"
                sx={{
                  marginTop: "1em",
                  fontSize: "14px",
                  width: "100%",
                  height: "50px",
                  background: teal[900],
                }}
              >
                Solicitar nuevo turno
              </Button>
            </Link>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
export default SchedulePatient;

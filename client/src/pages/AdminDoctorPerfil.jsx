import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Grid } from "@material-ui/core";
import CardDoctorPerfil from "../components/Admin/CardDoctorPerfil.jsx";
import { teal, grey } from "@mui/material/colors";
import DataTable from "react-data-table-component";
import SimpleAppBar from "../components/AppBar/SimpleAppBar.jsx";
function AdminDoctorPerfil() {
  //HOOKS
  const { id } = useParams();

  //Local States
  const [data, setData] = useState([]);
  const [dataDoctor, setDataDoctor] = useState();

  //FUNCTIONS
  const getDoctor = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/admin/doctor/${id}`
    );
    setDataDoctor(data.data);
    console.log(dataDoctor);
  };
  const getAppointments = async () => {
    const URL = "http://localhost:3001";
    const response = await axios.get(`${URL}/doctor/appointment/${id}`);
    let refactor = response.data.data.map((e) => {
      return {
        name: e.patient.person.name,
        lastname: e.patient.person.lastname,
        date: e.date,
        hour_long: e.hour_long,
        payment_status: e.payment_status,
      };
    });
    setData(refactor);
  };

  //HANDLES TABLA
  const columnas = [
    { name: "Fecha", selector: (row) => row["date"] },
    { name: "Hora", selector: (row) => row["hour_long"], sortable: true },
    {
      name: "Nombre",
      selector: (row) => row["name"],
      sortable: true,
    },
    { name: "Apellido", selector: (row) => row["lastname"], sortable: true },
    {
      name: "Estado de pago",
      selector: (row) => row["payment_status"],
      sortable: true,
    },
  ];

  useEffect(() => {
    getDoctor();
    getAppointments();
  }, []);

  return (
    <Box>
      {/* <PrimarySearchBar bgColor={teal[900]} color={teal[900]} />   */}
      <SimpleAppBar background={teal[900]} marginBottom={10} />
      <Grid container justifyContent="center" style={{ marginTop: 90 }}>
        <Grid item>
          {dataDoctor && (
            <CardDoctorPerfil
              image={dataDoctor.imageProfile}
              docName={`${dataDoctor.name} ${dataDoctor.lastname}`}
              cbu={dataDoctor.cbu}
            />
          )}
        </Grid>
      </Grid>

      <Box sx={{ background: grey[50] }}>
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
              Estado de Turnos
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
                  fixedHeaderScrollHeight="300px"
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
                  {`NO HAY TURNOS REGISTRADO`}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default AdminDoctorPerfil;

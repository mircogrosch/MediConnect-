import React, { useState, useEffect } from "react";
import PrimarySearchAppBar from "../components/Notification/AppBarNoti";
import { Typography, Button, Grid, Box } from "@mui/material";
import { teal, grey } from "@mui/material/colors";
import axios from "axios";
import swal from "sweetalert";
import DataTable from "react-data-table-component";

const AdminPatients = () => {
  const [data, setData] = useState([]);
  const URL = "http://localhost:3001";

  const handleToDisable = (dni) => {
    swal("Vas a deshabilitar a este usuario", {
      dangerMode: true,
      buttons: { cancel: true, confirm: "Continuar" },
    })
      .then(
        (success) =>
          success &&
          axios.delete(`http://localhost:3001/admin/person?personDni=${dni}`)
      )
      .then((res) => res && getPatients())
      .catch((error) => console.log("Error al deshabilitar el usuario", error));
  };

  const handleEnable = (dni) => {
    swal("Vas a habilitar a este usuario", {
      dangerMode: true,
      buttons: { cancel: true, confirm: "Continuar" },
    })
      .then(
        (success) =>
          success &&
          axios.post(`http://localhost:3001/admin/person?personDni=${dni}`)
      )
      .then((res) => res && getPatients())
      .catch((error) => console.log("Error al habilitar el usuario", error));
  };

  const columnas = [
    {
      name: "Nombre",
      selector: (row) => row["name"],
      sortable: true,
    },
    { name: "Apellido", selector: (row) => row["lastname"], sortable: true },
    {
      name: "DNI",
      selector: (row) => row["dni"],
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row["email"],
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row["rol"],
      sortable: true,
    },
    {
      name: "",
      cell: (row) =>
        row.rol === "Patient" ? (
          <Button
            onClick={() => handleToDisable(row.dni)}
            variant="contained"
            sx={{
              margin: "0.5em",
              lineHeight: "1.2em",
              fontSize: "8px",
              width: "100%",
              height: "30px",
              background: teal[800],
            }}
          >
            Deshabilitar usuario
          </Button>
        ) : (
          <Button
            onClick={() => handleEnable(row.dni)}
            variant="contained"
            sx={{
              margin: "0.5em",
              lineHeight: "1.2em",
              fontSize: "8px",
              width: "100%",
              height: "30px",
              background: teal[800],
            }}
          >
            Habilitar usuario
          </Button>
        ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const getPatients = async () => {
    const response = await axios.get(`${URL}/admin/patients`);
    let refactor = response.data.data.map((e) => {
      return {
        address: e.address,
        dni: e.dni,
        name: e.name,
        lastname: e.lastname,
        email: e.email,
        rol: e.rol,
      };
    });
    setData(refactor);
  };

  useEffect(() => {
    getPatients();
  }, []);

  return (
    <>
      <Box sx={{ background: grey[50] }}>
        <PrimarySearchAppBar bgColor={teal[900]} color={teal[900]} />
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
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
              Pacientes registrados
            </Typography>
            {data.length ? (
              <Grid
                style={{
                  marginTop: "1em",
                  width: "80%",
                  background: grey[100],
                  border: "solid 0.0005px ",
                  borderColor: teal[100],
                  //   fontFamily: "Roboto",
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
                  No hay pacientes registrados
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
};
export default AdminPatients;

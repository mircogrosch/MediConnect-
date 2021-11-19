import React from "react";
import { Box, Grid } from "@mui/material";
import Card from "./cards/Card.jsx";
import { Link } from "react-router-dom";
import { teal } from "@material-ui/core/colors";
import jwt from "jsonwebtoken";

function ContainerCards({ cardInfo }) {
  const user = jwt.verify(
    JSON.parse(sessionStorage.getItem("user"))?.token,
    "secret"
  );

  return (
    <Box sx={{ marginTop: { md: "2em" } }}>
      <Grid container columnSpacing={3} rowSpacing={4} justifyContent="center">
        <Grid item md={4} sm={4} xs={5}>
          {user.user.rol === "Doctor" ? (
            <Link
              to={`/account/profesional/schedule/${user.rol.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card
                title="Mis Turnos"
                icon={cardInfo[0].icon}
                bgColor={teal[900]}
                color={teal[50]}
              />
            </Link>
          ) : (
            <Link
              to={`/account/patient/schedule/${user.rol.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card
                title="Mis Turnos"
                icon={cardInfo[0].icon}
                color={teal[900]}
              />
            </Link>
          )}
        </Grid>
        <Grid item md={4} sm={4} xs={5}>
          {user.user.rol === "Doctor" ? (
            <Link
              to={`/doctor/patients/medical-historial/${user.rol.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card
                title="Historial Medico"
                icon={cardInfo[1].icon}
                bgColor={teal[900]}
                color={teal[50]}
              />
            </Link>
          ) : (
            <Link
              to={`/account/patient/medical-history/${user.rol.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card title="Historial Medico" icon={cardInfo[0].icon} color={teal[900]} />
            </Link>
          )}
        </Grid>
        <Grid item md={4} sm={4} xs={5}>
          {user.user.rol === "Doctor" ? (
            <Link
              to={`/account/doctor/patients/${user.rol.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card
                title="Mis Pacientes"
                icon={cardInfo[2].icon}
                bgColor={teal[900]}
                color={teal[50]}
              />
            </Link>
          ) : (
            <Link
              to={`/account/profesionales/${user.rol.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card title="Mis Profesionales" icon={cardInfo[2].icon} color={teal[900]}/>
            </Link>
          )}
        </Grid>
        <Grid item md={4} sm={4} xs={5}>
          {user.user.rol === "Doctor" ? (
            <Link to={`/doctor/recipes`} style={{ textDecoration: "none" }}>
              <Card
                title="Mis Recetas"
                icon={cardInfo[3].icon}
                bgColor={teal[900]}
                color={teal[50]}
              />
            </Link>
          ) : (
            <Link to={`/patient/recipes`} style={{ textDecoration: "none" }}>
              <Card title="Mis Recetas" icon={cardInfo[3].icon} color={teal[900]} />
            </Link>
          )}
        </Grid>
        <Grid item md={4} sm={4} xs={5}>
          {user.user.rol === "Doctor" ? (
            <Link to={`/doctor/orders`} style={{ textDecoration: "none" }}>
              <Card
                title="Mis Órdenes"
                icon={cardInfo[4].icon}
                bgColor={teal[900]}
                color={teal[50]}
              />
            </Link>
          ) : (
            <Link to={`/patient/orders`} style={{ textDecoration: "none" }}>
              <Card title="Mis Ordenes" icon={cardInfo[3].icon}  color={teal[900]}/>
            </Link>
          )}
        </Grid>
        {/* <Grid item md={4} sm={4} xs={5}>
          {user.user.rol ==="Doctor" ? (
             <Link to={`/mensajes/profesional`} style={{ textDecoration: "none" }}>
            <Card
              title="Mensajes"
              icon={cardInfo[5].icon}
              bgColor={teal[600]}
              color={teal[50]}
            />
            </Link>
          ) : (
            <Link to={`/mensajes/paciente`} style={{ textDecoration: "none" }}>
              <Card title="Mensajes" icon={cardInfo[5].icon} />
            </Link>
          )}
        </Grid> */}
      </Grid>
    </Box>
  );
}

export default ContainerCards;

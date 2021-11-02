import React from "react";
import { Box, Grid } from "@mui/material";
import {
  EventAvailableOutlined,
  EventNoteOutlined,
  AccountBoxOutlined,
  ListAltOutlined,
  ForumOutlined,
} from "@mui/icons-material";
import Card from "./cards/Card.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const cardInfo = [
  {
    title: "Mis Turnos",
    icon: <EventAvailableOutlined sx={{ fontSize: 50 }} />,
  },
  {
    title: "Historial Medico",
    icon: <EventNoteOutlined sx={{ fontSize: 40 }} />,
  },
  {
    title: "Mis Profesionales",
    icon: <AccountBoxOutlined sx={{ fontSize: 40 }} />,
  },
  { title: "Mis Recetas", icon: <ListAltOutlined sx={{ fontSize: 40 }} /> },
  { title: "Mis Órdenes", icon: <ListAltOutlined sx={{ fontSize: 40 }} /> },
  { title: "Mensajes", icon: <ForumOutlined sx={{ fontSize: 40 }} /> },
];

function ContainerCards() {
  const user = useSelector((state) => state.users);
  return (
    <Box sx={{ marginTop: { md: "2em" } }}>
      <Grid container columnSpacing={3} rowSpacing={4}>
        <Grid item md={4} sm={4} xs={5}>
          <Card title="Mis Turnos" icon={cardInfo[0].icon} />
        </Grid>
        <Grid item md={4} sm={4} xs={5}>
          <Card title="Historial Medico" icon={cardInfo[1].icon} />
        </Grid>
        <Grid item md={4} sm={4} xs={5}>
          <Link
            to={`/account/prueba/${user.users.patient.id}`}
            style={{ textDecoration: "none" }}
          >
            <Card title="Mis Profesionales" icon={cardInfo[2].icon} />
          </Link>
        </Grid>
        <Grid item md={4} sm={4} xs={5}>
          <Card title="Mis Recetas" icon={cardInfo[3].icon} />
        </Grid>
        <Grid item md={4} sm={4} xs={5}>
          <Card title="Mis Órdenes" icon={cardInfo[4].icon} />
        </Grid>
        <Grid item md={4} sm={4} xs={5}>
          <Card title="Mensajes" icon={cardInfo[5].icon} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ContainerCards;

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
  return (
    <Box sx={{ marginTop: { md: "2em" } }}>
      <Grid container columnSpacing={3} rowSpacing={4}>
        {Array.isArray(cardInfo) ? (
          cardInfo.map((info) => (
            <Grid item md={4} sm={4} xs={5}>
              <Card title={info.title} icon={info.icon} />
            </Grid>
          ))
        ) : (
          <h1> No se recibio la informacion correspondiente</h1>
        )}
      </Grid>
    </Box>
  );
}

export default ContainerCards;

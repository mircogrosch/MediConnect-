import React from "react";
import { useSelector } from "react-redux";
import { useStyles } from "../styles/home";
import { Box, Grid } from "@mui/material";
import { teal } from "@mui/material/colors";
import {
  EventAvailableOutlined,
  EventNoteOutlined,
  AccountBoxOutlined,
  ListAltOutlined,
  ForumOutlined,
} from "@mui/icons-material";
import Perfil from "../components/Home/Perfil";
import ShifsNotificator from "../components/Home/ShifsNotificator.jsx";
import ContainerCards from "../components/Home/ContainerCards.jsx";
import PrimarySearchAppBar from "../components/Notification/AppBarNoti.jsx";

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

function HomePatientPage() {
  const classes = useStyles();
  const user = useSelector((state) => state.users.users.user.user);
  return (
    <Box className={classes.root} sx={{ background: teal[50] }}>
      <PrimarySearchAppBar />
      <Box className={classes.container}>
        <Grid container columnSpacing={4} justifyContent="center">
          <Grid item lg={3} md={4} xs={10}>
            <Perfil
              name={user.name}
              lastname={user.lastname}
              dni={user.dni}
              address={user.address}
            />
          </Grid>
          <Grid container item md={8} xs={11} flexDirection="column">
            <ShifsNotificator />
            <ContainerCards cardInfo={cardInfo}/>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default HomePatientPage;

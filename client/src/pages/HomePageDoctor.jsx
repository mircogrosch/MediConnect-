import React from "react";
import { Box, Grid } from "@mui/material";
import { teal } from "@mui/material/colors";
import {
  EventAvailableOutlined,
  EventNoteOutlined,
  AccountBoxOutlined,
  ListAltOutlined,
  ForumOutlined,
} from "@mui/icons-material";
import PrimarySearchAppBar from "../components/Notification/AppBarNoti.jsx";
import Perfil from "../components/Home/Perfil";
import ShifsNotificator from "../components/Home/ShifsNotificator.jsx";
import ContainerCards from "../components/Home/ContainerCards.jsx";
import { useStyles } from "../styles/home";

const cardInfo = [
  {
    title: "Agenda",
    icon: <EventAvailableOutlined sx={{ fontSize: 50 }} />,
  },
  {
    title: "Emitir Receta",
    icon: <EventNoteOutlined sx={{ fontSize: 40 }} />,
  },
  {
    title: "Mis Pacientes",
    icon: <AccountBoxOutlined sx={{ fontSize: 40 }} />,
  },
  { title: "Turnos", icon: <ListAltOutlined sx={{ fontSize: 40 }} /> },
  { title: "Billetera", icon: <ListAltOutlined sx={{ fontSize: 40 }} /> },
  { title: "Emitir Orden", icon: <ForumOutlined sx={{ fontSize: 40 }} /> },
];

function HomePageDoctor() {
  const classes = useStyles();

  return (
    <Box className={classes.root} sx={{ background: teal[100] }}>
      <PrimarySearchAppBar bgColor={teal[500]} color={teal[50]} />
      <Box className={classes.container}>
        <Grid container md={12} columnSpacing={4} justifyContent="center">
          <Grid item lg={3} md={4} xs={10}>
            <Perfil
              bgColor={teal[500]}
              bgDarkColor={teal[800]}
              color={teal[50]}
            />
          </Grid>
          <Grid container item md={8} xs={11} flexDirection="column">
            <ShifsNotificator
              bgColor={teal[500]}
              bgDarkColor={teal[800]}
              color={teal[50]}
            />
            <ContainerCards
              cardInfo={cardInfo}
              bgColor={teal[500]}
              infoColor={teal[50]}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default HomePageDoctor;

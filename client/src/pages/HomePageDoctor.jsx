import React, { useEffect } from "react";
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
import ContainerCards from "../components/Home/ContainerCards.jsx";
import { useStyles } from "../styles/home";
import { socket_Connect, socket } from "../components/Controlers/notifications";
import {
  initiateSocketChat,
  socketChat,
} from "../components/Controlers/chatMessage";
import jwt from "jsonwebtoken";
import { useDispatch } from "react-redux";
import { getMyPatients } from "../actions/index.js";
import Carousel from "../components/Home/Carousel";

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
  const dispatch = useDispatch();
  const user = jwt.verify(
    JSON.parse(sessionStorage.getItem("user"))?.token,
    "secret"
  );
  const classes = useStyles();
  //conexion con socket
  useEffect(() => {
    socket_Connect(user.user, socket);
    initiateSocketChat(user.user.email, socketChat);
  }, [user.user]);
  useEffect(() => {
    // Dispara la accion para traer todos los doctores asociados al paciente
    dispatch(getMyPatients(user.rol.id));
  }, [dispatch, user.rol.id]);

  console.log(user);

  return (
    <Box className={classes.root} sx={{ background: teal[50] }}>
      <PrimarySearchAppBar bgColor={teal[900]} color={teal[50]} />
      <Box className={classes.container}>
        <Grid container spacing={2} sx={{ height: "90%" }}>
          <Grid item xl={4} md={4} xs={12}>
            <Perfil
              name={user.user.name}
              lastname={user.user.lastname}
              dni={user.user.dni}
              address={user.user.address}
              imagePerfil={user.user.imageProfile}
              location={user.rol.location}
              email={user.user.email}
              enrollment={user.rol.enrollment}
            />
          </Grid>
          <Grid
            item
            xl={8}
            md={8}
            xs={12}
            display="flex"
            flexDirection="column"
          >
            <Carousel rol={{ rol: user.user.rol }} />
            <ContainerCards cardInfo={cardInfo} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default HomePageDoctor;

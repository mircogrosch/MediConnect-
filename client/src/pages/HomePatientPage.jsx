import React, { useEffect } from "react";
import { useStyles } from "../styles/home";
import { Box, Grid } from "@mui/material";
import { teal, grey } from "@mui/material/colors";
import {
  EventAvailableOutlined,
  EventNoteOutlined,
  AccountBoxOutlined,
  ListAltOutlined,
  ForumOutlined,
} from "@mui/icons-material";
import Perfil from "../components/Home/Perfil";
import ContainerCards from "../components/Home/ContainerCards.jsx";
import PrimarySearchAppBar from "../components/Notification/AppBarNoti.jsx";
import jwt from "jsonwebtoken";
import { socket, socket_Connect } from "../components/Controlers/notifications";
import { useDispatch } from "react-redux";
import { getMyDoctors } from "../actions";
import {
  initiateSocketChat,
  socketChat,
} from "../components/Controlers/chatMessage";
import Carousel from "../components/Home/Carousel";

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
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = jwt.verify(
    JSON.parse(sessionStorage.getItem("user"))?.token,
    "secret"
  );
  useEffect(() => {
    socket_Connect(user.user, socket);
    initiateSocketChat(user.user.email, socketChat);
  }, [user.user]);

  useEffect(() => {
    // Dispara la accion para traer todos los doctores asociados al paciente
    dispatch(getMyDoctors(user.rol.id));
  }, [dispatch, user.rol.id]);
  console.log(user);
  return (
    <Box className={classes.root} sx={{ background: teal[50] }}>
      <PrimarySearchAppBar />
      <Box className={classes.container}>
        <Grid container columnSpacing={4} justifyContent="center">
          <Grid item lg={3} md={4} xs={10}>
            <Perfil
              name={user.user.name}
              email={user.user.email}
              lastname={user.user.lastname}
              dni={user.user.dni}
              address={user.user.address}
              imagePerfil={user.user.imageProfile}
              bgDarkColor={teal[200]}
              color={grey[700]}
              user={user.user}
              healthInsurance={user.rol.healthInsurance.name}
            />
          </Grid>
          <Grid container item md={8} xs={11} flexDirection="column">
            <Carousel rol={{ rol: user.user.rol }} />
            <ContainerCards cardInfo={cardInfo} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default HomePatientPage;

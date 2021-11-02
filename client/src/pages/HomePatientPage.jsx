import React from "react";
import {useSelector} from 'react-redux'
import { useStyles } from "../styles/home";
import { Box, Grid } from "@mui/material";
import Perfil from "../components/Home/Perfil";
import ShifsNotificator from "../components/Home/ShifsNotificator.jsx";
import ContainerCards from "../components/Home/ContainerCards.jsx";
import PrimarySearchAppBar from '../components/Notification/AppBarNoti.jsx'

function HomePatientPage() {
  const classes = useStyles();
  const user = useSelector(state=> state.users.users.user);
  return (
    <div className={classes.root}>
        <PrimarySearchAppBar />
      <Box className={classes.container}>
        <Grid container md={12} columnSpacing={4} justifyContent="center">
          <Grid item lg={3} md={4} xs={10}>
            <Perfil name={user.name} lastname={user.lastname} dni={user.dni} address={user.address} />
          </Grid>
          <Grid container item md={8} xs={11} flexDirection="column">
            <ShifsNotificator />
            <ContainerCards/>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default HomePatientPage;

import React, { useEffect } from "react";
import { useStyles } from "../../styles/doctors/add_doctor";
import { Grid, Box } from "@mui/material";
import CardAdd from "./CardAdd";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors } from "../../actions/index";
import {
  socket,
  socket_Connect,
  send_Notifications,
} from "../Controlers/notifications";

function ContainerCardAdd({ props }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let allDoctors = useSelector((state) => state.allDoctors.allDoctors);
  let userLog = useSelector((state) => state.users.users.user);

  useEffect(() => {
    dispatch(getDoctors());
    socket_Connect(userLog, socket);
  }, []);

  return (
    <Grid
      container
      rowSpacing={2}
      className={classes.containerCards}
      sx={{ height: { sm: "70vh", xs: "65vh" } }}
    >
      {allDoctors &&
        allDoctors.map((e) => {
          return (
            <Grid
              item
              xl={4}
              md={6}
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <CardAdd
                name={e.name}
                lastname={e.lastname}
                address={e.address}
                email={e.email}
                sendNotification={send_Notifications}
                idPatient={props.match.params.id}
                idDoctor={e.id}
                specialities={
                  e.specialities.length ? e.specialities[0].name : "Cardio"
                }
              />
            </Grid>
          );
        })}
    </Grid>
  );
}

export default ContainerCardAdd;

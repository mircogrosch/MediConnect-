import React, { useEffect } from "react";
import { useStyles } from "../../styles/doctors/add_doctor";
import { Grid } from "@mui/material";
import CardAdd from "./CardAdd";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors } from "../../actions/index";
import {
  send_Notifications,
  socket_Connect,
  socket,
} from "../Controlers/notifications";
import jwt from "jsonwebtoken";

function ContainerCardAdd({ props }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let allDoctors = useSelector((state) => state.allDoctors.allDoctors);
  let userLog = jwt.verify(
    JSON.parse(sessionStorage.getItem("user"))?.token,
    "secret"
  );

  useEffect(() => {
    dispatch(getDoctors(props.match.params.id));
    socket_Connect(userLog.user, socket);
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
                key={e.id}
                name={e.name}
                lastname={e.lastname}
                address={e.address}
                email={e.email}
                sendNotification={send_Notifications}
                idPatient={props.match.params.id}
                idDoctor={e.id}
                image={e.imageProfile}
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

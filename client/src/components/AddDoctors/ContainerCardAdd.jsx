import React, { useEffect } from "react";
import { useStyles } from "../../styles/doctors/add_doctor";
import { Grid, Typography } from "@mui/material";
import CardAdd from "./CardAdd";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors } from "../../actions/index";
import {
  send_Notifications,
  socket_Connect,
  socket,
} from "../Controlers/notifications";
import jwt from "jsonwebtoken";
import { useParams } from "react-router-dom";
import { grey } from "@mui/material/colors";

function ContainerCardAdd() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  let allDoctors = useSelector((state) => state.allDoctors.allDoctors);
  let userLog = jwt.verify(
    JSON.parse(sessionStorage.getItem("user"))?.token,
    "secret"
  );

  useEffect(() => {
    dispatch(getDoctors(id));
    socket_Connect(userLog.user, socket);
  }, [dispatch, id]);

  return (
    <Grid
      container
      rowSpacing={2}
      className={classes.containerCards}
      sx={{ height: { sm: "70vh", xs: "65vh" } }}
    >
      {allDoctors.length > 0 ? (
        allDoctors.map((e) => {
          return (
            <Grid
              item
              key={e.id}
              xl={4}
              md={6}
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardAdd
                key={e.id}
                name={e.name}
                lastname={e.lastname}
                address={e.address}
                email={e.email}
                sendNotification={send_Notifications}
                idPatient={id}
                idDoctor={e.id}
                image={e.imageProfile}
                specialities={
                  e.specialities.length ? e.specialities[0].name : "CARDIOLOGÍA"
                }
              />
            </Grid>
          );
        })
      ) : (
        <Grid
          height="30vh"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            align={"center"}
            variant="h6"
            style={{ color: grey[700] }}
          >
            No hay ningún profesional registrado
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}

export default ContainerCardAdd;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors } from "../../actions/index";
import { Grid } from "@mui/material";
import {
  socket,
  socket_Connect,
  send_Notifications,
} from "../Controlers/notifications";
import CardAdd from "./CardAdd";

function ContainerCardAdd({ props }) {
  const dispatch = useDispatch();

  let userLog = useSelector((state) => state.users.users.user);
  let allDoctors = useSelector((state) => state.allDoctors.allDoctors);

  useEffect(() => {
    dispatch(getDoctors());
    socket_Connect(userLog, socket);
  }, []);

  return (
    <Grid
      container
      sx={{
        height: "70vh",
        overflowY: "scroll",
      }}
    >
      {allDoctors &&
        allDoctors.map((doctor) => {
          return (
            <Grid
              item
              xs={6}
              key={doctor.id}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <CardAdd
                name={doctor.name}
                lastname={doctor.lastname}
                address={doctor.address}
                email={doctor.email}
                sendNotification={send_Notifications}
                idPatient={props.match.params.id}
                idDoctor={doctor.id}
                specialities={
                  doctor.specialities.length
                    ? doctor.specialities[0].name
                    : "CARDIOLOGIA"
                }
              />
            </Grid>
          );
        })}
    </Grid>
  );
}

export default ContainerCardAdd;

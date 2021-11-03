import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import CardAdd from "./CardAdd";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors, postMyDoctor } from "../../actions/index";
import {socket,socket_Connect,send_Notifications} from '../Controlers/notifications'


function ContainerCardAdd({ props }) {
  const dispatch = useDispatch();
  let allDoctors = useSelector((state) => state.allDoctors);
  let userLog = useSelector((state) => state.users.users.user);
  allDoctors = allDoctors.allDoctors;

  useEffect(() => {
    dispatch(getDoctors());
  }, []);

  useEffect(()=>{
    socket_Connect(userLog,socket)
  },[])

  return (
    <Grid
      container
      width="100%"
      display="flex"
      flex-direction="row"
      justify-content="center"
      backgroundColor="primary"
      //   justify-content="space-around"
      columnSpacing={1}
      rowSpacing={1}
      //   pl="200px"
      //   p="10px"
    >
      {allDoctors &&
        allDoctors.map((e) => {
          return (
            <Grid item xs={12} md={6} key={e.id}>
              <CardAdd
                name={e.name}
                lastname={e.lastname}
                address={e.address}
                sendNotification={send_Notifications}
                idPatient={props.match.params.id}
                idDoctor={e.id}
                specialities={
                  e.specialities.length ? e.specialities[0].name : "Cardio"
                }
                email={e.email}
              />
            </Grid>
          );
        })}
    </Grid>
  );
}

export default ContainerCardAdd;

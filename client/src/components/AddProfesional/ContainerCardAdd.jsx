import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import CardAdd from "./CardAdd";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors, postMyDoctor } from "../../actions/index";

function ContainerCardAdd({ props }) {
  const dispatch = useDispatch();
  let allDoctors = useSelector((state) => state.allDoctors);
  allDoctors = allDoctors.allDoctors;

  useEffect(() => {
    dispatch(getDoctors());
  }, []);

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
                post={postMyDoctor}
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

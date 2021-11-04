import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors, postMyDoctor } from "../../actions/index";
import { Grid } from "@mui/material";
import CardAdd from "./CardAdd";

function ContainerCardAdd({ props }) {
  const dispatch = useDispatch();

  let allDoctors = useSelector((state) => state.allDoctors.allDoctors);

  useEffect(() => {
    dispatch(getDoctors());
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
        allDoctors.map((e) => {
          return (
            <Grid
              item
              xl={4}
              md={6}
              xs={12}
              key={e.id}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <CardAdd
                name={e.name}
                lastname={e.lastname}
                address={e.address}
                post={postMyDoctor}
                idPatient={props.match.params.id}
                idDoctor={e.id}
                specialities={
                  e.specialities.length ? e.specialities[0].name : "CARDIOLOGIA"
                }
              />
            </Grid>
          );
        })}
    </Grid>
  );
}

export default ContainerCardAdd;

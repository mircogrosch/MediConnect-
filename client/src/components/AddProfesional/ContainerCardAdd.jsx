import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import CardAdd from "./CardAdd";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors, getMyDoctors } from "../../actions/index";

function ContainerCardAdd({ props }) {
  const dispatch = useDispatch();

  let MyDoctors = useSelector((state) => state.myDoctors);
  console.log("myDoctors", MyDoctors);
  console.log("myDoctors typeof", typeof MyDoctors);

  useEffect(() => {
    dispatch(getMyDoctors(props.match.params.id));
  }, []);

  //////////////////////////////////////////////////////////////////////////////////
  let allDoctors = useSelector((state) => state.allDoctors);
  allDoctors = allDoctors.allDoctors;
  console.log("allDoctors", allDoctors);
  console.log("allDoctors typeof", typeof allDoctors);
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
            <Grid item xs={12} md={6}>
              <CardAdd
                name={e.name}
                lastname={e.lastname}
                address={e.address}
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

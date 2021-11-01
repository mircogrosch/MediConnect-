import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import CardAdd from "./CardAdd";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors } from "../../actions/index";

function ContainerCardAdd() {
  const dispatch = useDispatch();
  let allDoctors = useSelector((state) => state.allDoctors);
  allDoctors = allDoctors.allDoctors;
  console.log("allDoctors", allDoctors);
  console.log("allDoctors typeof", typeof allDoctors);

  useEffect(() => {
    dispatch(getDoctors());
  }, []);

  return (
    <Grid container justifyContent="center">
      {allDoctors.map((e) => {
        return (
          <CardAdd name={e.name} lastname={e.lastname} address={e.address} />
        );
      })}
    </Grid>
  );
}

export default ContainerCardAdd;

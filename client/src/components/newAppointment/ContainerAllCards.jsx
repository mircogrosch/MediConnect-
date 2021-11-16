import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { getMyDoctors } from "../../actions/index";

function ContainerAllCards({ props }) {
  const dispatch = useDispatch();

  let myDoctors = useSelector((state) => state.myDoctors.names); // Doctores asociados

  useEffect(() => {
    dispatch(getMyDoctors(props.match.params.id));
  }, []);

  const refactorWorkDays = (arrayObj) => {
    let newArray = [];
    for (let i = 0; i < arrayObj.length; i++) {
      switch (arrayObj[i].day) {
        case 1:
          let lun = {
            day: "Lun",
            num: 1,
            init: `${arrayObj[i].init.hour}:${arrayObj[i].init.minutes}`,
            end: `${arrayObj[i].end.hour}:${arrayObj[i].end.minutes}`,
          };
          newArray.push(lun);

        case 2:
          let mar = {
            day: "Mar",
            num: 2,
            init: `${arrayObj[i].init.hour}:${arrayObj[i].init.minutes}`,
            end: `${arrayObj[i].end.hour}:${arrayObj[i].end.minutes}`,
          };
          newArray.push(mar);

        case 3:
          let mie = {
            day: "Mie",
            num: 3,
            init: `${arrayObj[i].init.hour}:${arrayObj[i].init.minutes}`,
            end: `${arrayObj[i].end.hour}:${arrayObj[i].end.minutes}`,
          };
          newArray.push(mie);

        case 4:
          let jue = {
            day: "Jue",
            num: 4,
            init: `${arrayObj[i].init.hour}:${arrayObj[i].init.minutes}`,
            end: `${arrayObj[i].end.hour}:${arrayObj[i].end.minutes}`,
          };
          newArray.push(jue);
        case 5:
          let vie = {
            day: "Vie",
            num: 5,
            init: `${arrayObj[i].init.hour}:${arrayObj[i].init.minutes}`,
            end: `${arrayObj[i].end.hour}:${arrayObj[i].end.minutes}`,
          };
          newArray.push(vie);
        default:
          return newArray;
      }
    }
    return newArray;
  };

  let refactor = myDoctors.map((e) => {
    return {
      address: e.address,
      dni: e.dni,
      name: e.name,
      lastname: e.lastname,
      email: e.email,
      enrollment: e.enrollment,
      image: e.imageProfile,
      specialities: e.specialities[0].name,
      work_days: refactorWorkDays(e.work_days),
    };
  });

  return (
    <>
      {/* Doctores asociados */}
      <Grid
        container
        sx={{
          height: "70vh",
          display: "flex",
          overflowY: "scroll",
          marginTop: "1em",
          justifyContent: "center",
          rowSpacing: 1,
        }}
      >
        {refactor &&
          refactor.map((e) => {
            return (
              <Grid
                // container
                item
                key={e.id}
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Card
                  work_days={e.work_days}
                  key={e.id}
                  name={e.name}
                  lastname={e.lastname}
                  address={e.address}
                  email={e.email}
                  idPatient={props.match.params.id}
                  idDoctor={e.id}
                  image={e.image}
                  specialities={e.specialities}
                />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
}

export default ContainerAllCards;

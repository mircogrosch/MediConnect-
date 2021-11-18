import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getMyDoctors } from "../../../actions";
import { useParams } from "react-router-dom";
import { teal, grey } from "@mui/material/colors";
import Card from "./Card";

function ContainerAllCards({ setDoctorData, nextStep }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  let myDoctors = useSelector((state) => state.myDoctors.names); // Doctores asociados

  useEffect(() => {
    dispatch(getMyDoctors(id));
  }, [id, dispatch]);

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
          break;

        case 2:
          let mar = {
            day: "Mar",
            num: 2,
            init: `${arrayObj[i].init.hour}:${arrayObj[i].init.minutes}`,
            end: `${arrayObj[i].end.hour}:${arrayObj[i].end.minutes}`,
          };
          newArray.push(mar);
          break;

        case 3:
          let mie = {
            day: "Mie",
            num: 3,
            init: `${arrayObj[i].init.hour}:${arrayObj[i].init.minutes}`,
            end: `${arrayObj[i].end.hour}:${arrayObj[i].end.minutes}`,
          };
          newArray.push(mie);
          break;

        case 4:
          let jue = {
            day: "Jue",
            num: 4,
            init: `${arrayObj[i].init.hour}:${arrayObj[i].init.minutes}`,
            end: `${arrayObj[i].end.hour}:${arrayObj[i].end.minutes}`,
          };
          newArray.push(jue);
          break;

        case 5:
          let vie = {
            day: "Vie",
            num: 5,
            init: `${arrayObj[i].init.hour}:${arrayObj[i].init.minutes}`,
            end: `${arrayObj[i].end.hour}:${arrayObj[i].end.minutes}`,
          };
          newArray.push(vie);
          break;

        default:
          return newArray;
      }
    }
    return newArray;
  };

  let refactor = myDoctors.map((e) => {
    return {
      id: e.id,
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
      {refactor.length ? (
        refactor.map((e) => {
          return (
            <Grid
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
                colorFont={"#676767"}
                color={teal[200]}
                name={e.name}
                lastname={e.lastname}
                address={e.address}
                email={e.email}
                idPatient={id}
                idDoctor={e.id}
                image={e.image}
                specialities={e.specialities}
                setDoctorData={setDoctorData}
                nextStep={nextStep}
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
          }}
        >
          <Typography
            align={"center"}
            variant="h6"
            style={{ color: grey[700] }}
          >
            No tiene ningún profesional asociado
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}

export default ContainerAllCards;

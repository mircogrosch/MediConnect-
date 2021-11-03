import React from "react";
import { Box, Grid } from "@mui/material";
import Card from "./cards/Card.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function ContainerCards({ cardInfo,bgColor,infoColor }) {
  const user = useSelector((state) => state.users.users);
  return (
    <Box sx={{ marginTop: { md: "2em"} }}>
      <Grid container columnSpacing={3} rowSpacing={4}>
        {cardInfo.map((info) =>
          info.title === "Mis Profesionales" ||
          info.title === "Mis Pacientes" ? (
            <Grid item md={4} sm={4} xs={5}>
              <Link
                to={
                  user.patient
                    ? `/account/profesionales/${user.patient.id}`
                    : `/account/profesionales/${user.doctor.id}`
                }
                style={{textDecoration:"none"}}
              >
                <Card title={info.title} icon={info.icon} bgColor={bgColor} color={infoColor} />
              </Link>
            </Grid>
          ) : (
            <Grid item md={4} sm={4} xs={5}>
              <Card title={info.title} icon={info.icon} bgColor={bgColor} color={infoColor}/>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
}

export default ContainerCards;

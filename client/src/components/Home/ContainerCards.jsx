import React from "react";
import { Box, Grid } from "@mui/material";
import Card from "./cards/Card.jsx";

function ContainerCards(props) {
  console.log(props.cardInfo);
  return (
    <Box sx={{ marginTop: { md: "2em" } }}>
      <Grid container columnSpacing={3} rowSpacing={4}>
        {Array.isArray(props.cardInfo) ? (
          props.cardInfo.map((info) => (
            <Grid item md={4} sm={4} xs={5}>
              <Card
                title={info.title}
                icon={info.icon}
                bgColor={props.bgColor}
                color={props.infoColor}
              />
            </Grid>
          ))
        ) : (
          <h1> No se recibio la informacion correspondiente</h1>
        )}
      </Grid>
    </Box>
  );
}

export default ContainerCards;

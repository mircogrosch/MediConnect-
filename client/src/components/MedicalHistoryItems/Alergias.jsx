import React from "react";
import { Box, Typography, Grid } from "@material-ui/core";

const alergiaInfo = [
  {
    title: "Penicilina",
  },
  {
    title: "Polen",
  },
  {
    title: "Hormigas",
  },
];
function Alergias() {
  return (
    <div>
      <Box>
        <Typography variant="h4">Mis alergias</Typography>
        <Grid
          item
          container
          display="flex"
          justifyContent="space-evenly"
          flexDirection="row"
          alignItem="center"
          rowSpacing={8}
        >
          {alergiaInfo.map((elemento) => (
            <Grid item md={8}>
              {/* <Box border="solid"> */}
              <Typography variant="body1">{`${elemento.title} descubierta el dia 27 de noviembre de 2020 `}</Typography>
              {/* </Box> */}
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
export default Alergias;

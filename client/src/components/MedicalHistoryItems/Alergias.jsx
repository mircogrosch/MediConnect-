import React, { useState, useEffect } from "react";
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

function Alergias({ getAllergy }) {
  const [allergy, setAllergy] = useState([]);

  useEffect(() => {
    (async function () {
      setAllergy(await getAllergy());
    })();
  }, []);

  console.log("allergy ", allergy);
  return (
    <div>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4">Mis alergias</Typography>
        <Grid
          container
          display="flex"
          justifyContent="space-evenly"
          flexDirection="row"
          alignItem="center"
          rowSpacing={8}
        >
          {allergy.data &&
            allergy.data.map((elemento) => (
              <Grid item md={8}>
                <Typography variant="body1">{`Nombre: ${elemento.name} | Peligrosidad: ${elemento.severity}  | Descripción: ${elemento.description}`}</Typography>
              </Grid>
            ))}
        </Grid>
      </Box>
    </div>
  );
}
export default Alergias;

import React from "react";
import { Card, Grid, Typography } from "@mui/material";
import ContainerShifsInfo from "./ContainerShifsInfo.jsx";
import { teal,grey } from "@mui/material/colors";
import {Link} from 'react-router-dom'
function ShifsNotificator() {
  return (
    <div>
      <Grid container md={12} style={{ backgroundColor: teal[100],borderRadius:12 }}>
        <Grid container direction="column">
          <Card
            style={{
              backgroundColor: teal[800],
              display: "flex",
              justifyContent: "center",
              color: "#fff",
              borderRadius:8            
            }}
          >
            <Typography variant="h5" style={{padding:"0.1em"}}>PROXIMO TURNO</Typography>
          </Card>

          <Grid
            container
            direction="row"
            alignItems="center"
            style={{ padding: "1em" }}
          >
            <Grid item md={4}>
              <ContainerShifsInfo
                date={"12/05"}
                time={"20:00"}
                doctor={"Dr. Fernandez"}
                location={"Trevelin Chubut"}
              />
            </Grid>
            <Grid item md={8}>
              <Typography variant="h6" style={{color:grey[600]}}>
                Usted Tiene un pago pendiente
                <Link to="/">Ir a seccion de pago</Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ShifsNotificator;

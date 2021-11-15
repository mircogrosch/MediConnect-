import React from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import ShifsInfo from "./notificator/ShifsInfo.jsx";
import { teal, grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { useStyles } from "../../styles/home/shift.js";

function ShifsNotificator(props) {
  const classes = useStyles();

  return (
    <Box
      sx={{
        bgcolor: props.bgColor || teal[100],
        borderRadius: "12px",
        boxShadow: "-1px 4px 3px rgba(171,171,171,1)",
      }}
      className={classes.root}
    >
      <Card
        style={{
          backgroundColor: teal[800],
          display: "flex",
          justifyContent: "center",
          color: "#fff",
          borderRadius: 8,
        }}
      >
        <Typography variant="h5" style={{ padding: "0.1em" }}>
          Próximo turno
        </Typography>
      </Card>
      <Grid
        item
        display="flex"
        flexDirection="column"
        justifyContent="center"
        md={12}
        sx={{ height: { md: 200 } }}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          style={{ padding: "1em" }}
        >
          <Grid item md={4}>
            <ShifsInfo
              date={"12/05"}
              time={"20:00"}
              doctor={"Dr. Fernandez"}
              location={"Trevelin Chubut"}
              bgDarkColor={props.bgDarkColor}
              color={props.color}
              styles={classes}
            />
          </Grid>
          <Grid item display="flex" flexDirection="column" md={8}>
            <Typography
              variant="h6"
              textAlign="center"
              fontWeight="normal"
              color={props.color || grey[600]}
            >
              El pago de la consulta esta pendiente
            </Typography>
            <Typography variant="h6" textAlign="center">
              <Link to="/" style={{ color: teal[900] }}>
                Ir a seccion de pago
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ShifsNotificator;

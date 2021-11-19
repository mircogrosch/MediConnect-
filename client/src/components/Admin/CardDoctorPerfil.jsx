import React from 'react'
import { Box, Typography, Grid } from "@material-ui/core";
import { AccountCircle } from "@mui/icons-material";
import { teal } from "@mui/material/colors";
function CardDoctorPerfil({image,docName,cbu}) {
    return (
    <Box
      bgcolor={teal[200]}
      width="60vw"
      height="75px"
      borderRadius="7px"
      padding="1em 0em 0em 1em"
    >
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        display="flex"
        sx={{ width: "70vw", padding: "0.5em 1em", borderRadius: "5px" }}
      >
        <Grid item md={1}>
          <img
            src={image || AccountCircle}
            alt="circle user"
            style={{ width: "60px", height: "60px", borderRadius: "50%" }}
          />
        </Grid>
        <Grid item md={3}>
          <Typography variant="body1">{docName}</Typography>
        </Grid>
        <Grid item md={3}>
          <Typography variant="body1">
            {cbu}
          </Typography>
        </Grid>
      </Grid>
    </Box>
    )
}

export default CardDoctorPerfil

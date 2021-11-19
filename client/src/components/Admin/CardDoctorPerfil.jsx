import React from 'react'
import { Box, Typography, Grid,Button } from "@material-ui/core";
import { AccountCircle } from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import {Link} from 'react-router-dom'
function CardDoctorPerfil({image,docName,cbu}) {
    return (
    <Box
      bgcolor={teal[800]}
      width="60vw"
      height="75px"
      borderRadius="7px"
      padding="1em 0em 0em 1em"
    >
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
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
        <Typography variant="body1" style={{color:teal[50]}}>{`Dr: ${docName}`}</Typography>
        </Grid>
        <Grid item md={3}>
          <Typography variant="body1" style={{color:teal[50]}}>
            {`CBU: ${cbu}`}
          </Typography>
        </Grid>
        <Grid item md={3}>
        <Link to={{ pathname: "https://mercadopago.com.ar" }} target="_blank" style={{textDecoration:"none"}}>
          <Button variant="contained" size="small" style={{bgColor:teal[50]}}> 
         <Typography variant="a" style={{color:teal[800]}}>
            Realizar Transferencia
          </Typography> 
        </Button> 
        </Link>
        
        
        </Grid>
      </Grid>
    </Box>
    )
}

export default CardDoctorPerfil

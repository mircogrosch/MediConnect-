import React from 'react'
import useStyles from '../styles.js'
import { Grid, Typography,Card } from "@mui/material";
import {
  LocationOnOutlined,
  EventAvailable,
  QueryBuilder,
  Person

} from "@mui/icons-material";
import {  grey,teal} from "@mui/material/colors";

function ContainerShifsInfo({date,time,location,doctor}) {

    const classes= useStyles()  
      return (
        <div>
          <Card className={classes.container} sx={{bgcolor:teal[200],borderRadius:5, maxWidth:150}}>
     <Grid container rowSpacing={1} direction="column" justifyContent="center" alignItems="center">     
            <Grid item container columnSpacing={-5} >
        <Grid item xs={2}>
          <EventAvailable style={{ color: grey[600] }} fontSize="20" />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="p" className={classes.letters}>
            {date}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container  columnSpacing={-5} >
        <Grid item xs={2}>
          <QueryBuilder style={{ color: grey[600] }} fontSize="20" />
        </Grid>
        <Grid item xs={10}>
          <Typography  variant="p" className={classes.letters}>
           {time}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container  columnSpacing={-5}>
        <Grid item xs={2}>
          <LocationOnOutlined style={{ color: grey[600] }} fontSize="20" />
        </Grid>
        <Grid item lxs={10}>
          <Typography  variant="p" className={classes.letters}>
            {location}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container columnSpacing={-5}>
        <Grid item xs={2}>
          <Person style={{ color: grey[600] }} fontSize="20" />
        </Grid>
        <Grid item xs={10}>
          <Typography  variant="p" className={classes.letters}>
           {doctor}
          </Typography>
        </Grid>
      </Grid>
      </Grid> 
    </Card>
        </div>
    )
}

export default ContainerShifsInfo

import React from "react";
import { Grid, Typography, Card } from "@mui/material";
import {
  LocationOnOutlined,
  EventAvailable,
  QueryBuilder,
  PersonOutlined,
} from "@mui/icons-material";
import { grey, teal } from "@mui/material/colors";

function ContainerShifsInfo({
  date,
  time,
  location,
  doctor,
  styles,
  bgDarkColor,
  color,
}) {
  const classes = styles;

  return (
    <div>
      <Card
        className={classes.cardInfo}
        sx={{ bgcolor: bgDarkColor || teal[200], borderRadius: 5 }}
      >
        <Grid
          container
          rowSpacing={1}
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item container columnSpacing={-5}>
            <Grid item xs={2}>
              <EventAvailable
                sx={{ color: color || grey[700] }}
                fontSize="20"
              />
            </Grid>
            <Grid item xs={10}>
              <Typography
                variant="p"
                className={classes.letters}
                color={color || grey[700]}
              >
                {date}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container columnSpacing={-5}>
            <Grid item xs={2}>
              <QueryBuilder sx={{ color: color || grey[700] }} fontSize="20" />
            </Grid>
            <Grid item xs={10}>
              <Typography
                variant="p"
                className={classes.letters}
                color={color || grey[700]}
              >
                {time}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container columnSpacing={-5}>
            <Grid item xs={2}>
              <LocationOnOutlined
                sx={{ color: color || grey[700] }}
                fontSize="20"
              />
            </Grid>
            <Grid item lxs={10}>
              <Typography
                variant="p"
                className={classes.letters}
                color={color || grey[700]}
              >
                {location}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container columnSpacing={-5}>
            <Grid item xs={2}>
              <PersonOutlined
                sx={{ color: color || grey[700] }}
                fontSize="20"
              />
            </Grid>
            <Grid item xs={10}>
              <Typography
                variant="p"
                className={classes.letters}
                color={color || grey[700]}
              >
                {doctor}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

export default ContainerShifsInfo;

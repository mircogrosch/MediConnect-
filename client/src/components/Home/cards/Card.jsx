import React from "react";
import { Box, Typography } from "@mui/material";
import useStyles from "../../../styles/home/card";

function Card({ title, icon }) {
  const classes = useStyles();

  return (
    <div>
      <Box
        className={classes.card}
        sx={{
          // height: 120,
          width: { xl: 300, lg: 250, md: 200, sm: 220 },
        }}
      >
        <div className={classes.icon}>{icon}</div>
        <Typography variant="h5" fontSize={20} className={classes.text}>
          {title}
        </Typography>
      </Box>
    </div>
  );
}

export default Card;

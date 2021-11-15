import React from "react";
import { Box, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import useStyles from "../../../styles/home/card";

function Card(props) {
  const classes = useStyles();

  return (
    <div>
      <Box
        className={classes.card}
        sx={{
          // height: 120,
          width: { xl: 300, lg: 250, md: 200, sm: 220 },
          background: props.bgColor || teal[100],
        }}
      >
        <div
          className={classes.icon}
          style={{ color: props.color || teal[500] }}
        >
          {props.icon}
        </div>
        <Typography
          variant="h5"
          fontSize={20}
          className={classes.text}
          color={props.color || teal[500]}
        >
          {props.title}
        </Typography>
      </Box>
    </div>
  );
}

export default Card;

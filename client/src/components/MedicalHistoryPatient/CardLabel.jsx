import React from "react";
import { Box, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";

function CardLabel({ title }) {
  return (
    <Box
      sx={{
        width: "100%",
        background: teal[200],
        borderRadius: "5px 5px 0 0",
      }}
    >
      <Typography
        variant="h3"
        textAlign="center"
        color={teal[900]}
        padding="0.3em"
        sx={{ fontSize: "2.5em" }}
      >
        {title}
      </Typography>
    </Box>
  );
}

export default CardLabel;

import React from "react";
import { Box, Typography } from "@mui/material";
import { teal, grey } from "@mui/material/colors";

function HourCard({ hour, selectHour }) {
  return (
    <Box
      onClick={() => hour.available && selectHour(hour.value)}
      sx={{
        padding: "2px 5px",
        border: `2px solid ${hour.available ? teal[500] : grey[500]}`,
        borderRadius: "5px",
        cursor: hour.available && "pointer",
      }}
    >
      <Typography
        variant="body1"
        textAlign="center"
        color={`${!hour.available && grey[500]}`}
      >
        {hour.value}
      </Typography>
    </Box>
  );
}

export default HourCard;

import React from "react";
import { Box, Typography } from "@mui/material";
import { teal, grey } from "@mui/material/colors";

function HourCard({ time, selectHour }) {
  return (
    <Box
      onClick={() => time.available && selectHour(time.hour, time.mins)}
      sx={{
        padding: "2px 5px",
        border: `2px solid ${time.available ? teal[500] : grey[500]}`,
        borderRadius: "5px",
        cursor: time.available && "pointer",
      }}
    >
      <Typography
        variant="body1"
        textAlign="center"
        color={`${!time.available && grey[500]}`}
      >
        {time.show}
      </Typography>
    </Box>
  );
}

export default HourCard;

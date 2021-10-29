import React from "react";
import { Card, Box, Typography } from "@mui/material";
import useStyles from "../styles";

function CardHome({ title, icon }) {
  const estilos = useStyles();
  return (
    <div>
      <Card
        sx={{ maxWidth: 230,}}
        style={{
            backgroundColor: "#B2DFDB",
            height: 130,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#004D40",
            boxShadow: "-1px 6px 5px 0px rgba(171,171,171,1)",
        }}
      >
        <Box sx={{ display: "flex", margin: 3 }}>
          <div className={estilos.icon}>{icon}</div>
          <Typography variant="h5" className={estilos.text} sx={{fontSize:20}}>
            {title}
          </Typography>
        </Box>
      </Card>
    </div>
  );
}

export default CardHome;

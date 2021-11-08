import { Box, Icon, Typography, Grid } from "@material-ui/core";
import React from "react";
import { styled } from "@mui/material/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { teal } from "@mui/material/colors";

const MyType = styled(Typography)({
  display: "inline-flex",
  h4: {
    fontSize: "10px",
  },
});

const MyAdd = styled(AddCircleOutlineIcon)({
  width: "60px",
  height: "60px",
  //   margin: "10px",
});

const AddProfesionals = () => {
  return (
    <Box
      bgcolor={"#C9C9C9"}
      width={"100%"}
      height={"130px"}
      sx={{ borderRadius: "5px", padding: "1em" }}
    >
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: "100%",
        }}
      >
        <Grid
          item
          xs={8}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Agregar nuevo profesional</Typography>
        </Grid>
        <Grid item xs={4}>
          <Icon style={{ width: "100%", height: "100%", textAlign: "center" }}>
            <MyAdd style={{ fontSize: "80px", color: "676767" }} />
          </Icon>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddProfesionals;

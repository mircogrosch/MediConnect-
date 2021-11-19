import React from "react";
import { AppBar, Toolbar, Box } from "@mui/material";
import logo from "../../img/mediconnect-logo.png";

function SimpleAppBar(props) {
  return (
    <>
      <AppBar
        elevation={0}
        style={{
          background: props.background || "transparent",
          marginBottom: props.marginBottom || false,
        }}
      >
        <Toolbar>
          <Box style={{ flexGrow: "1" }}>
            <img src={logo} alt="MediConnect+" style={{ width: "200px" }} />
          </Box>
          <Box style={{ display: "flex", alignItems: "center" }}>
            {props.content}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default SimpleAppBar;

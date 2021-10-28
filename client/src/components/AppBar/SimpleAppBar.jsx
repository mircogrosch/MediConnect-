import React from "react";
import { AppBar, Toolbar, Box } from "@mui/material";
import logo from "../../img/mediconnect-logo.png";

function SimpleAppBar() {
  return (
    <>
      <AppBar elevation={0} style={{ background: "transparent" }}>
        <Toolbar>
          <Box>
            <img src={logo} alt="MediConnect+" style={{ width: "200px" }} />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default SimpleAppBar;

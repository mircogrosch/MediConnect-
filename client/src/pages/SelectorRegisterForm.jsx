import React from "react";
import { CssBaseline } from "@mui/material";
import { useStyles } from "../styles/selectTypeRegister/selector.js";
import Body from "../components/selectorTypeRegister/Body.jsx";
import SimpleAppBar from "../components/AppBar/SimpleAppBar.jsx";

function SelectorRegisterForm() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SimpleAppBar />
      <Body />
    </div>
  );
}

export default SelectorRegisterForm;

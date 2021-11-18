import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@mui/material";
import Appbar from "../components/landing/AppBar";
import Header from "../components/landing/Header";
import Body from "../components/landing/Body";
import Footer from "../components/landing/Footer";

const useStyles = makeStyles({
  root: {
    background: "#E0F2F1",
  },
});

function LandingPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Appbar />
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default LandingPage;

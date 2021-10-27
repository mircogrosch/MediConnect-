import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@mui/material";
import Appbar from "../components/landing/AppBar";
import Header from "../components/landing/Header";
import Body from "../components/landing/Body";
import Footer from "../components/landing/Footer";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(to bottom, #e0f2f1, #4db6ac)",
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

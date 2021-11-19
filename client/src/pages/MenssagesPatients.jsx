import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Chat from "../components/Chat/Chat";
import ContactList from "../components/ContactList/ContactList";
import PrimarySearchAppBar from "../components/Notification/AppBarNoti";

const Mensajes = () => {
  let myList = useSelector((state) => state.myDoctors);

  return (
    <Grid>
      <PrimarySearchAppBar />
      <Grid container>
        <Grid item md={5}>
          <ContactList user={myList.names} />
        </Grid>
        <Grid item md={7}>
          <Chat user={myList} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Mensajes;

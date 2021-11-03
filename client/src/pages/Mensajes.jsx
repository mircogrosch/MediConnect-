import { Grid } from "@material-ui/core";
import React from "react";
import Chat from "../components/Chat/Chat";
import ContactList from "../components/ContactList/ContactList";
import PrimarySearchAppBar from "../components/Notification/AppBarNoti";

const Mensajes = () => {
    return(
        <Grid>
            <PrimarySearchAppBar/>
            <Grid
            container>
                <Grid
                item
                md={5}>
                <ContactList/>
                </Grid>
                <Grid
                item
                md={7}>
                <Chat/>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Mensajes
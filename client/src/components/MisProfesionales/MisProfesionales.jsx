import React from "react";
import SearchBar from '../SearchBar/SearchBar'
import FiltroSelect from '../FiltroSelect/FiltroSelect'
import Card from "../Card/Card";
import AddProfesionals from "../Card/AddProfesionals";
import { Grid } from "@mui/material";
import SimpleAppBar from "../AppBar/SimpleAppBar";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";

const MyGrid = styled(Grid)({
    display: 'flex',
    marginTop: '70px'
})


const MisProfesionales = () => {
    return(
        <Box sx={{backgroundColor: '#b2dfdb', margin:'5px', borderRadius:'10px'}}>
        <Grid>
            <SimpleAppBar/>
            <MyGrid>
                <FiltroSelect/>
                <SearchBar/>
            </MyGrid>
            <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <Box sx={{display:'flex', alignItems:'center'}}>
                    <AddProfesionals/>
                    <Card/>
                </Box>
                <Box>
                    <Card/>
                    <Card/>
                </Box>
                <Box>
                    <Card/>
                    <Card/>
                </Box>
            </Box>
        </Grid>
        </Box>
    )
}

export default MisProfesionales
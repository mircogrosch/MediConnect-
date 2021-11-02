import React, { useEffect } from "react";
import SearchBar from '../SearchBar/SearchBar'
import FiltroSelect from '../FiltroSelect/FiltroSelect'
import Card from "../Card/Card";
import AddProfesionals from "../Card/AddProfesionals";
import { Grid } from "@mui/material";
import SimpleAppBar from "../AppBar/SimpleAppBar";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors } from "../../actions";
import { Link } from "react-router-dom";

const MyGrid = styled(Grid)({
    display: 'flex',
    marginTop: '70px'
})


const MisProfesionales = () => {
    const dispatch = useDispatch();
    let allDoctors = useSelector((state) => state.allDoctors);
    allDoctors = allDoctors.allDoctors;
    console.log("allDoctors", allDoctors);
    console.log("allDoctors typeof", typeof allDoctors);
  
    useEffect(() => {
      dispatch(getDoctors());
    }, []);
    return(
        <Box sx={{backgroundColor: '#b2dfdb', margin:'5px', borderRadius:'10px'}}>
        <Grid>
            <SimpleAppBar/>
            <MyGrid>
                <FiltroSelect/>
                <SearchBar/>
            </MyGrid>
            <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <Grid 
                container items
                display='flex'
                justifyContent='center'
                >
                    <Link to='/prueba2'>
                    <AddProfesionals/>
                    </Link>
                    {allDoctors.map((e) => {
                        return (
                        <Card name={e.name} lastname={e.lastname} address={e.address} specialities={e.specialities[0].name}/>
                        );
                    })}
                </Grid>
            </Box>
        </Grid>
        </Box>
    )
}

export default MisProfesionales
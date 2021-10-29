import { MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { handleChangeSpecial } from "../Controlers/Controlers";

const MySelect = styled(TextField)({
    backgroundColor: '#80cbc4',
    width: '400px',
    // height: '50px',
    borderRadius: '3px',
    margin: '30px',
    border: 'none'
})

const specialties = [
    {value: 'Pediatria'},
    {value: 'Kinesiologia'},
    {value: 'Clinica medica'},
    {value: 'Oftalmologo'},
  ];

const FiltroSelect = () =>{
      
    const [speciality, setSpeciality] = useState('');
      
    return(
        <Box sx={{backgroundColor: '#b2dfdb'}}>
            <MySelect
            select
            color = 'transparent'
            label="Especialidades"
            value={speciality}
            onChange={(e) => handleChangeSpecial(e, speciality, setSpeciality)}
            // variant='standard'
            >
                {specialties.map((p) => (
                    <MenuItem key={p.value} value={p.value}>
                        {p.value}
                    </MenuItem>
                ))}
            </MySelect>
        </Box>
    )
}

export default FiltroSelect
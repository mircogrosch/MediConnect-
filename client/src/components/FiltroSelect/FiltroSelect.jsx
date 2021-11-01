import { MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { handleChangeSpecial } from "../Controlers/Controlers";
import { useDispatch } from "react-redux";
// import { getSpecialities } from "../../actions";

const MySelect = styled(TextField)({
    backgroundColor: '#80cbc4',
    width: '500px',
    // height: '50px',
    borderRadius: '3px',
    margin: '30px',
    marginRight:'270px',
})

const specialties = [
    {value: 'Pediatria'},
    {value: 'Kinesiologia'},
    {value: 'Clinica medica'},
    {value: 'Oftalmologo'},
  ];

const FiltroSelect = () =>{
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(getSpecialities)
    // })
      
    const [speciality, setSpeciality] = useState('');
      
    return(
        <Box>
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
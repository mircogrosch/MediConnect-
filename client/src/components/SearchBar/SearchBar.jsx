import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { IconButton, InputBase,  } from "@material-ui/core";
import { Search } from "@mui/icons-material";
import { handleChangeSpecial } from "../Controlers/Controlers";

const MySearchbar = styled(InputBase)({
    backgroundColor: '#80cbc4',
    width: '500px',
    borderRadius: '3px',
    margin:'30px',
    padding:'0px 0px 0px 10px'
})

const SearchBar = () =>{

    const [input, setInput] = useState('')


    const handleSubmit = (e) => {
        console.log(input)
    }
    return(
        // <Box sx={{backgroundColor: '#b2dfdb'}}>
            <MySearchbar 
            variant='outlined' 
            placeholder='Buscar'
            onChange = {(e) => handleChangeSpecial(e, input, setInput)}
            endAdornment={
                <IconButton 
                onClick = {(e) => handleSubmit(e)}>
                    <Search color='#bdbdbd'/>
                </IconButton>
            }>
            </MySearchbar>
        // </Box> 
    )
}

export default SearchBar
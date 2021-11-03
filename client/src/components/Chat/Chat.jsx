import React from 'react'
import { Grid } from '@mui/material'
import { styled } from '@mui/system'
import { InputBase } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import { Send } from '@mui/icons-material'
import { Box } from '@mui/system'
import { teal } from '@material-ui/core/colors'


const MyGrid = styled(Grid)({
    backgroundColor: teal[100],
    borderRadius:'5px',
    display: 'flex',
    flexDirection:'column',
    marginRight:'20px',
    marginTop:'30px',
    height: '82vh',
    padding:'5px',
    boxShadow: "-1px 4px 3px rgba(171,171,171,1)"
})
const MyTextInput = styled(InputBase)({
    border: '1px solid #bdbdbd',
    borderRadius: '5px',
    backgroundColor: 'white',
    height:'45px',
    padding:'3px'
})

function Chat() { 
    return (
        <MyGrid>
            <Box sx={{backgroundColor:'grey', width:700, height:500, maxWidth:700, maxHeight:500}}/>
            <MyTextInput
            placeholder='Escriba su mensaje...'
            // onChange = {(e) => handleChangeSpecial(e, input, setInput)}
            endAdornment={
                <IconButton 
                // onClick = {(e) => handleSubmit(e)}
                >
                    <Send color='primary'/>
                </IconButton>
            }/>
        </MyGrid>
    )
}

export default Chat

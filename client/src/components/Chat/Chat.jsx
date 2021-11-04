import React from 'react'
import { Grid } from '@mui/material'
import { styled } from '@mui/system'
import { InputBase, Typography } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import { AccountCircle, Send } from '@mui/icons-material'
import { Box } from '@mui/system'
import { teal } from '@material-ui/core/colors'

const MyBox = styled(Box)({
    backgroundColor: teal[200],
    borderRadius:'5px',
    display:'flex',
    alignItems:'center',
    // marginTop:'11px'
})

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
const MyIcon = styled(AccountCircle)({
    width:'50px',
    height:'50px',
    marginRight:'5px',
    marginLeft:'10px'
})

function Chat() { 
    return (
        <MyGrid>
            <MyBox sx={{ whidth:700, height:75}}>
            <MyIcon/>
                <Typography variant='h5'>Nombre del doctor</Typography>
            </MyBox>
            <Box sx={{ width:700, height:500, maxWidth:700, maxHeight:500}}/>
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

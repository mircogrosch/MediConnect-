import { AccountCircle } from '@mui/icons-material'
import { Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/system'
import { Check, Close } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { postMyDoctor } from '../../actions'

const MyGrid = styled(Grid)({
    display: 'flex',
    width:'440px',
    height:'50px',   
    marginBottom:'10px' 
})
const MyIcon = styled(AccountCircle)({
    width:'50px',
    height:'50px'
})

function CardNotification({msg, idDoctor, idPatient}) { 

    const dispatch = useDispatch()
    const handleAcept = (idPatient, idDoctor, e) =>{
        e.preventDefault()
        dispatch(postMyDoctor(idPatient, idDoctor))
    }

    return (
        <MyGrid>
            <MyIcon/>
            <Grid>
                <Typography variant='h6'>Notificacion</Typography>
                <Typography variant='body'>{msg}</Typography>
            </Grid>
            <IconButton sx={{marginLeft:'20px'}} onClick={(e) => handleAcept(idPatient, idDoctor, e)}><Check/></IconButton>
            <IconButton><Close/></IconButton>
        </MyGrid>
    )
}

export default CardNotification

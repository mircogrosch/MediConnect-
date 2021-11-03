import { AccountCircle } from '@mui/icons-material'
import { Divider, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/system'
import { Check, Close } from '@mui/icons-material'

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

function CardNotification() { 
    return (
        <MyGrid>
            <MyIcon/>
            <Grid>
                <Typography variant='h6'>Notificacion</Typography>
                <Typography variant='body'>Descripcion De Notificacion</Typography>
            </Grid>
            <IconButton sx={{marginLeft:'20px'}}><Check/></IconButton>
            <IconButton><Close/></IconButton>
        </MyGrid>
    )
}

export default CardNotification

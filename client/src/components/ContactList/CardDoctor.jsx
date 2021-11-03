import { AccountCircle } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/system'

const MyGrid = styled(Grid)({
    display: 'flex',
    width:'440px',
    height:'50px',   
    marginBottom:'10px' 
})
const MyIcon = styled(AccountCircle)({
    width:'60px',
    height:'60px',
    marginRight:'20px'
})

function CardDoctor() { 
    return (
        <MyGrid>
            <MyIcon/>
            <Grid>
                <Typography variant='h6'>Nombre del doctor/paciente</Typography>
                <Typography variant='body'>Ultimo mensaje del chat o si no tiene msj nada</Typography>
            </Grid>
        </MyGrid>
    )
}

export default CardDoctor

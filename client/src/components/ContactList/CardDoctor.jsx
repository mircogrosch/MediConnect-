import { AccountCircle } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/system'
import { useDispatch } from 'react-redux'
import { getContact, getMessage } from '../../actions'
import jwt from "jsonwebtoken";


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

function CardDoctor({name, lastname, email, rol, img, dni}) { 
    const user = jwt.verify(
        JSON.parse(sessionStorage.getItem("user"))?.token,
        "secret"
      );
    const dispatch = useDispatch()
    let docName = `${name} ${lastname}`
    const handleContact = () => {
        dispatch(getContact(email, rol))
        dispatch(getMessage(user.user.dni, dni))
    }
    return (
        <MyGrid onClick={(e) => handleContact(e)}>
            {img ? (
            <img
              src={img}
              style={{
                maxWidth: "60px",
                maxHeight: "60px",
                minWidth: "60px",
                minHeight: "60px",
                borderRadius: "50%",
                marginRight:'20px'
              }}
            />
        ) : (
            <MyIcon/>
        )}
            <Grid>
                <Typography variant='h6'>{docName}</Typography>
                <Typography variant='body'>Ultimo mensaje del chat o si no tiene msj nada</Typography>
            </Grid>
        </MyGrid>
    )
}

export default CardDoctor

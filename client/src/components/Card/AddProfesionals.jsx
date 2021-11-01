import { Box, Icon, Typography } from "@material-ui/core";
import React from "react";
import { styled } from "@mui/material/styles";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const MyIcon = styled(Icon)({
    display: 'contents'
})

const MyType = styled(Typography)({
    display: 'inline-flex',
    h4:{
        fontSize: '10px'
    },
})

const MyBox = styled(Box)({
    display: 'inline-flex',
    flexDirection: 'column',
    width: '450px',
    height: '180px',
    margin: '30px',
    borderRadius: '10px',
})

const MyBox2 = styled(Box)({
    color: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: '400px',
    height: '200px',
    borderRadius: '10px',
})
const MyBox3 = styled(Box)({
    color: '#525752',
    display: 'inline-flex',
    fontSize: '20px',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '60px',
    marginTop: '-10px',
    width: '500px',
    height: '200px',
    borderRadius: '10px',
})

const MyAdd = styled(AddCircleOutlineIcon)({
    width: '90px',
    height: '90px',
    margin: '10px'
})

const Card = () => {
    return(
        <MyBox sx={{backgroundColor: '#C9C9C9'}}>
            <MyBox2>
                <MyBox3>
                <MyType variant='h4'>Agregar nuevo</MyType>
                <MyType variant='h4'>profesional</MyType>
                </MyBox3>
                <MyIcon><MyAdd sx={{color:'#525752'}}/></MyIcon>
            </MyBox2>
        </MyBox>
    )
}

export default Card
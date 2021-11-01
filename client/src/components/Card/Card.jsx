import { Box, Icon, Typography } from "@material-ui/core";
import React from "react";
import { styled } from "@mui/material/styles";
import { AccountCircle } from "@mui/icons-material";

const MyIcon = styled(Icon)({
    display: 'contents'
})

const MyType = styled(Typography)({
    display: 'inline',
    h4:{
        fontSize: '10px'
    }
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
    flexDirection: 'row',
    width: '500px',
    height: '200px',
    borderRadius: '10px',
})

const MyBox3 = styled(Box)({
    color: '#525752',
    display: 'inline-flex',
    fontSize: '20px',
    flexDirection: 'column',
    marginLeft: '120px',
    marginTop: '-20px',
    width: '500px',
    height: '200px',
    borderRadius: '10px',
})

const MyProfile = styled(AccountCircle)({
    width: '90px',
    height: '90px',
    margin: '10px'
})

const Card = () => {
    return(
        <MyBox sx={{backgroundColor: '#80cbc4'}}>
            <MyBox2>
                <MyIcon><MyProfile/></MyIcon>
                <MyType variant='h4'><b>Dr</b> nombreDelDoctor</MyType>
            </MyBox2>
            <MyBox3>
                <Box sx={{marginBottom: '10px'}}>
                    <Typography variant='body'><b>Fecha:</b> dd/mm/aaaa</Typography>
                </Box>
                <Typography variant='body'><b>Tipo:</b> TipoDeConsulta</Typography>
            </MyBox3>
        </MyBox>
    )
}

export default Card
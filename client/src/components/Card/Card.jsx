import { Box, Icon, Typography } from "@material-ui/core";
import React from "react";
import { styled } from "@mui/material/styles";
import { AccountCircle } from "@mui/icons-material";

const MyIcon = styled(Icon)({
    display: 'contents'
})

const MyType = styled(Typography)({
    display: 'inline',
    maxWidth: "290px",
})


const MyType2 = styled(Typography)({
    display: 'inline',
    maxWidth: "300px",
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

const Card = ({name, lastname, address, }) => {
    let docName = `Dr ${name} ${lastname}`
    return(
        <MyBox sx={{backgroundColor: '#80cbc4'}}>
            <MyBox2>
                <MyIcon><MyProfile/></MyIcon>
                <MyType variant='h4'>{docName}</MyType>
            </MyBox2>
            <MyBox3>
                <Box sx={{marginBottom: '10px', maxWidth: '300px'}}>
                    {/* <MyType2 variant='body'><b>Especialidad:</b> {specialities}</MyType2> */}
                </Box>
                <MyType2 variant='body'><b>Localidad:</b> {address}</MyType2>
            </MyBox3>
        </MyBox>
    )
}

export default Card
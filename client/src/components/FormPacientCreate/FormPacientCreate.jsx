import React, {useState} from "react";
import { FormControl, Input, InputLabel, TextField, Typography, Button, Grid,IconButton,InputAdornment } from '@mui/material';
import { styled } from "@mui/material/styles";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {handleChange, handleClickShowPassword, handleClickShowConf, handleMouseDownPassword} from '../Controlers/Controlers'

const MyButton = styled(Button)({
    width: '500px',
    margin: '20px',
    fontSize: '20px',
    fontWeight: '200',
    padding: '0px'
})  
const MyInput = styled(TextField)({
    borderBottomColor: 'green',
    width: '500px'
})
const MyTitle = styled(Typography)({
    marginTop: '20px',
    color: '#878787'
})

const FormPacientCreate = () =>{
    let errors = {}
    
    const [values, setValues] = useState({
        password: '',
        confirmPass:'',
        showPassword: false,
        showConf: false,
    });
    if(values.password === values.confirmPass){
        errors.idemPass = 'Contraseña distinta'
    }

    return(
        <>
        <Typography variant='h4' align='left' color='secondary'>Medi<b>Connect+</b></Typography>
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
        >
            <Grid item xs={3}>
            <MyTitle variant='h4' align='center'>Ingresa tus datos</MyTitle>
                <FormControl>
                        <MyInput id="standard-basic" label="Nombre:" variant="standard"/>
                        <MyInput id="standard-basic" label="Apellido:" variant="standard" />
                        <MyInput id="standard-basic" label="Email:" variant="standard" />
                        <FormControl variant='standard'>
                            <InputLabel htmlFor='standar-adornment-password'>Contraseña</InputLabel>
                            <Input 
                            id='standar-adornment-password'
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password', values, setValues)}
                            endAdornment={
                                <InputAdornment position='end'>
                                <IconButton
                                aria-label='toggle password visibility'
                                onClick={() => handleClickShowPassword(values, setValues)}
                                onMouseDown={(e) => handleMouseDownPassword(e)}>
                                    {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                            }/>
                        </FormControl>
                        <FormControl variant='standard'>
                            <InputLabel htmlFor='standar-adornment-password'>Confirme contraseña</InputLabel>
                            <Input
                            error={errors.idemPass ? false : true}
                            id='standar-adornment-password'
                            type={values.showConf ? 'text' : 'password'}
                            value={values.confirmPass}
                            onChange={handleChange('confirmPass', values, setValues)}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={() => handleClickShowConf(values, setValues)}
                                    onMouseDown={(e) => handleMouseDownPassword(e)}>
                                        {values.showConf ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }/>
                        </FormControl>
                        <MyInput id="standard-basic" label="DNI:" variant="standard" />
                        <MyInput id="standard-basic" label="Ubicacion:" variant="standard" />
                        <MyInput id="standard-basic" label="Obra social:" variant="standard" />
                        <MyInput id="standard-basic" label="Plan:" variant="standard" />
                        <MyInput id="standard-basic" label="N° socio:" variant="standard" />
                </FormControl>   
            </Grid>
                <MyButton variant='contained' >Registrar</MyButton>
        </Grid> 
        </>
    )
}

export default FormPacientCreate
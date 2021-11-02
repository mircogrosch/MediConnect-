import React, {useEffect, useState} from "react";
import { FormControl, 
    Input, 
    InputLabel, 
    TextField, 
    Typography, 
    Button, 
    Grid,
    IconButton,
    InputAdornment } from '@mui/material';
import { styled } from "@mui/material/styles";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {handleChange, 
    handleClickShowPassword, 
    handleClickShowConf, 
    handleMouseDownPassword,
    handleSubmit} from '../Controlers/Controlers'
import SimpleAppBar from "../AppBar/SimpleAppBar";
import { useDispatch, useSelector } from "react-redux";
import { getHealthInsurances } from "../../actions";
import {useHistory} from 'react-router-dom'

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
    const history = useHistory()
    const dispatch = useDispatch()
    const healthInsurances = useSelector((state => state.healthInsurances))
    useEffect(() => {
        dispatch(getHealthInsurances())
    },[])
    
    const [values, setValues] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        confirmPass: "",
        showPassword: false,
        showConf: false,
        dni: "",
        address: "",
        healthInsuranceId: "",
        // plan: "",
        num_member: "",
    });
    // if(!values.name) {errors.name = 'Se requiere un Nombre'};
    // if(!values.lastname) {errors.lastname = 'Se requiere un Apellido'};
    // if(!values.email) {errors.email = 'Se requiere un Email'};
    // if(!values.password) {errors.password = 'Se requiere contraseña'};
    if(values.password !== values.confirmPass) {errors.idemPass = 'Contraseña distinta'};
    // if(!values.dni) {errors.dni = 'Se requiere un DNI'};
    // if(!values.address) {errors.address = 'Se requiere una Direccion'};

    return(
        <>
        <SimpleAppBar/>
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
                        <MyInput 
                        error={errors.name ? true : false}
                        id="standard-basic" 
                        label="Nombre:" 
                        variant="standard" 
                        value={values.name}
                        onChange={handleChange('name', values, setValues)}/>
                        <MyInput 
                        error={errors.lastname ? true : false}
                        id="standard-basic" 
                        label="Apellido:" 
                        variant="standard"
                        value={values.lastname}
                        onChange={handleChange('lastname', values, setValues)}/>
                        <MyInput 
                        error={errors.email ? true : false}
                        id="standard-basic" 
                        label="Email:" 
                        variant="standard"
                        value={values.email}
                        onChange={handleChange("email", values, setValues)}/> 
                        <FormControl variant='standard'>
                            <InputLabel htmlFor='standar-adornment-password'>Contraseña</InputLabel>
                            <Input 
                            error={errors.password ? true : false}
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
                            error={errors.idemPass ? true : false}
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
                        <MyInput 
                        error={errors.dni ? true : false}
                        id="standard-basic" 
                        label="DNI:" 
                        variant="standard" 
                        value={values.dni}
                        onChange={handleChange("dni", values, setValues)}/>
                        <MyInput 
                        error={errors.address ? true : false}
                        id="standard-basic" 
                        label="Ubicacion:" 
                        variant="standard"
                        value={values.address}
                        onChange={handleChange('address', values, setValues)}/>
                        <MyInput
                            id="filled-select-currency-native"
                            select
                            label="Obra social"
                            value={values.healthInsurancesId}
                            name="healthInsuranceId"
                            onChange={handleChange('healthInsuranceId', values, setValues)}
                            SelectProps={{
                                native: true,
                            }}
                            variant="standard"
                            >
                            { healthInsurances.names && healthInsurances.names.map((option) => {return(
                                <option key={option.id} value={option.id}>
                                {option.name}
                                </option>
                            )})}
                        </MyInput>
                        {/*
                        <MyInput 
                        id="standard-basic" 
                        label="Plan:"
                        variant="standard"
                        value={values.plan}
                        onChange={handleChange('plan', values, setValues)}/> */}
                        <MyInput 
                        id="standard-basic" 
                        label="N° socio:" 
                        variant="standard"
                        value={values.num_member}
                        onChange={handleChange('num_member', values, setValues)}/>  
                </FormControl>   
            </Grid>
                <MyButton 
                variant='contained' 
                onClick={(e) => handleSubmit(e, errors, values, setValues, dispatch, history)}
                >Registrar</MyButton>
        </Grid> 
        </>
    )
}

export default FormPacientCreate
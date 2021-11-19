import React,{useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Grid } from "@material-ui/core";
import CardDoctorPerfil from '../components/Admin/CardDoctorPerfil.jsx';
import PrimarySearchBar from '../components/Notification/AppBarNoti.jsx'
function AdminDoctorPerfil() {
    const {id} = useParams()
    const [dataDoctor, setDataDoctor] = useState()
    useEffect(()=>{
       async ()=> {
          const {data}= await axios.get(`http://localhost:3001/admin/doctor/${id}`); 
            setDataDoctor(data)
        }
    },[])
    return (
        <Box >  
           <PrimarySearchBar bgColor={teal[900]} color={teal[50]} /> 
           <Grid container  > 
                <Grid item >
                    <CardDoctorPerfil image={dataDoctor.imageProfile} docName={`${dataDoctor.name} ${dataDoctor.lastname}`} cbu={dataDoctor.cbu} />
                </Grid>


            </Grid>

        </Box>
    
    )
}

export default AdminDoctorPerfil

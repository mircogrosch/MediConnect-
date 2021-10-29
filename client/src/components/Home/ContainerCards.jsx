import React from 'react'
import {Grid} from '@mui/material'
import CardHome from './CardHome.jsx'

function ContainerCards({cardInfo}) {
    return (
        <div>
            <Grid container rowSpacing={10} columnSpacing={6} direction="row" justifyContent="center" alignItems="center">
                {
                   Array.isArray(cardInfo) ? cardInfo.map((info) =>(
                        <Grid item> 
                            <CardHome title={info.title} icon={info.icon} />
                        </Grid> 
                    )
                ) :  <h1> No se recibio la informacion correspondiente</h1>
                }
            </Grid>
        </div>
    )
}

export default ContainerCards

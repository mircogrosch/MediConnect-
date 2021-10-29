import React from 'react'
import {Card,Box,Typography} from '@mui/material'
import themes from '../../themes';
import useStyles from './styles';

function CardHome({title,icon}) {
    const classes = useStyles()
    return (
        <div>
             
            <Card sx={{maxWidth:272}} className={classes.card}>
                <Box sx={{display:"flex", margin:3}}>
                    <div className={classes.icon}> 
                         {icon}
                    </div>     
                    <Typography variant="h5" className={classes.text} fontSize="24"> 
                        {title}
                    </Typography>
                </Box>

            </Card>
        </div>
    )
}

export default CardHome;
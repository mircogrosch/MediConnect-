import {createTheme} from '@mui/material'


const themes = createTheme({    
    palette:{
        primary:{
            main:"#009688",
            ligth:"#b2dfdb",
            dark:"#004d40",
            contrastText:"#fff",
            back: '#80cbc4',
            cards: '#4db6ac'
        },
        transparent:{
            main: 'rgba(189, 189, 189, 0)'
        }
    }
})
export default themes;
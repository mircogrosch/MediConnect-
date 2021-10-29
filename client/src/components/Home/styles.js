import {makeStyles} from '@material-ui/core'
import {  grey,teal} from "@mui/material/colors";
const useStyles = makeStyles((theme) => ({
    card:{ 
        backgroundColor:"#B2DFDB",
        height: 154,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:12,
        color:"#004D40",
        boxShadow:"-1px 6px 5px 0px rgba(171,171,171,1)"
} ,
    icon:{ 
      marginRight:10,
    },
    text:{ 
        marginLeft:2.5, 
        textAlign:"center",
        fontWeight: 500,
        
    },
    shifsContainer: {
        dispaly: "flex",
        
    },
    container:{ 
        backgroundColor:"red",
        width:180,
        height:140,
        display:"flex",
        justifyContent:"center",
       
    },
    letters:{
        color: grey[600],
        fontSize:"0.8rem",
        textAlign: "left",
    },
})) 

export default useStyles;
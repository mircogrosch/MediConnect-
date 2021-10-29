import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
    card:{ 
        backgroundColor:"#B2DFDB",
        height: 154,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:12,
        color:"#004D40",
        boxShadow:"-1px 6px 5px 0px rgba(171,171,171,1)"
    },
    icon:{ 
      marginRight:10,
    },
    text:{ 
        marginLeft:2.5, 
        textAlign:"center",
        fontWeight: 500,
        
    }
}) 

export default useStyles;
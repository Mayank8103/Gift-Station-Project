import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles({

    box:{
        width:'30%',
         height:400,
        background:'#fff',
        marginLeft:90,
        padding:10,
        display:'flex',
    }, 

    content:{
        display:'flex', 
        marginLeft:40,
        background:'#fff', 
        marginTop:25,
        fontFamily:'Poppins',
        fontWeight:600,
        fontSize:18, 
        flexDirection:'column'
    },
    box2:{
        width:'30%',
         height:400,
        background:'#fff',
        marginLeft:50,
        display:'flex',
        padding:10
    }, 

    inputbox:{
        width:'20vw',
        height:35,
        marginTop:30,
        padding:10,
        fontFamily:'Poppins',
        fontWeight:400,
        fontSize:16,
    },
    passbox:{
        width:'20vw',
        height:35,
        marginTop:20,
        padding:10,
        fontFamily:'Poppins',
        fontWeight:400,
        fontSize:16,
    },
    btn:{
        marginTop:30,
        background:'#c92532'
    }
 })
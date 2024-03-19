import { makeStyles } from "@mui/styles";
export const useStyles= makeStyles({
    mainContainer:{
        // display:'flex',
        // justifyContent:'center',
        // alignItems: 'center',
        // background:'#c8d6e5',
        // height:"100vh",
        width:"100%",
    },
    box1:{
        width:'100%',
        padding :40,
        margin:20,
         background:'#fff',
         borderRadius:20
    },
    box2:{
        width:'100%',
        padding :40,
        margin:20,
         background:'#fff',
         borderRadius:20
    },
    heading:{
        fontWeight:'bold',
        fontSize:20,
        fontFamily:'Poppins',
        letterSpacing:1,
        marginLeft:10

    },
    rowstyle:{
         display:'flex',
         flexDirection:'row',
         justifyContent:'center'
         

    },
    image:{
        borderRadius:100
    }
})

import { makeStyles } from "@mui/styles";
export const useStyles= makeStyles({
    mainContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems: 'center',
        // background:'#c8d6e5',
        backgroundSize:'cover',
        // height:500,
        width:'100%'

    },
    box:{
        width:800,
        height:'auto',
        padding :40,
        margin:20,
         background:'#fff',
        // background:'transparant',
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
         justifyContent:'space-between'
         

    },
    image:{
        borderRadius:100
    }
})

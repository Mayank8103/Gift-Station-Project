import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({

    ship:{

        fontFamily:'Poppins',
         fontSize:14, 
         fontWeight:400,
          marginTop:20,   
    },
    rightside:{

        fontFamily:'Poppins',
         fontSize:18, 
         fontWeight:400,
          marginTop:40, 
          display:'flex',
          flexDirection:'row',
          marginBottom:15
  
    },

   
    ship2:{

        fontFamily:'Poppins',
         fontSize:14, 
         fontWeight:400,
          marginTop:10,
          display:'flex',
          flexDirection:'row' 
    },

    mailbox:{
        display: 'flex',
        borderRadius: 5,
        height: 40,
        width: 350,
        border: "none",
        outline: 1,
        padding: " 0 15px 0 30px",
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: 16
    },
    bottom:{
        display:'flex', 
        justifyContent:'center',
         alignSelf:'center',
         marginTop:'1%',
         
    },
    text:{
        display: 'flex',
                    width: '15%',
                    fontFamily: 'Poppins',
                    fontSize: 16,
                    fontWeight: "bold",
                    flexDirection: 'column'
    }
    

    
})
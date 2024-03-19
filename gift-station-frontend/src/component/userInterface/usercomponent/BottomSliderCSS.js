
import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles({

    pictures:{
        display:"flex",
                justifyContent:'left',
                  
                     marginTop:30,
                    marginLeft:10,
                    marginRight:10,
                    background:'red',
                    objectFit:'cover',
                     overflow: 'hidden',
                    
                
                    
    },
            
      effect:{
            display:'inline-block',
            verticalAlign:'middle',
            transform:'translateZ(0)',
            backfaceVisibility:'hidden',
          
      },

      grow :{ 
        transition: "all .2s ease-in-out" ,
        
        "&:hover": { 
        transform: "scale(1.1)",
        }
        },

        slidertext:{
          display:'flex',
          justifyContent:'center',
          // alignItems:'center',
          alignSelf:'center',
          fontFamily:'Poppins',
         width: 200,
          fontSize:18,
          margin:'2%'
      }
        

})
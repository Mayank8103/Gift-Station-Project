import { Transform } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// const theme = useTheme();
// const matches = useMediaQuery(theme.breakpoints.down('md'));
export const useStyles = makeStyles({
  

    image:{
        width:'90%',
         height:'90%',
         borderRadius:55, 
         marginTop:'20%',
         marginLeft:'10%',
         marginRight:'0%',
         transition:'transform 2s',

         '&:hover':{
            boxShadow:'0 0 30px rgba(0,0,0.5)',
            transform:'scale(0.9)'  
         }
    },
     
    imageDivLeft:{
      // width:'90%',
      //  height:'90%',
       borderRadius:55, 
       marginTop:'20%',
      //  marginLeft:'12%',
       marginRight:'0%',
       
      //  transition:'transform 2s',

      //  '&:hover':{
      //     boxShadow:'0 0 30px rgba(0,0,0.5)',
      //     transform:'scale(0.9)'  
      //  }

    },

    imageLeft:{
      width:'300px',
      height:'300px',
       borderRadius:55, 
       marginTop:'20%',
      //  marginLeft:'12%',
       marginRight:'0%',
       
       transition:'transform 2s',

       '&:hover':{
          boxShadow:'0 0 30px rgba(0,0,0.5)',
          // transform:'scale(0.9)'  
       }

  },

    imageRight:{
      width:'90%',
       height:'90%',
       borderRadius:55, 
       marginTop:'20%',
       marginLeft:'5%',
       marginRight:'15%',
       transition:'transform 2s',

       '&:hover':{
          boxShadow:'0 0 30px rgba(0,0,0.5)',
          transform:'scale(0.9)'  
       }
  },
    cake:{
        marginTop:'8%',
        // marginLeft:'40%',
        fontSize:22,
        fontWeight:500,  
        fontFamily:'Poppins',
        
        justifyContent:'center',
        
    },
   
    midimg:{
        // width:450,
         height:400,
        //  marginTop:30,
        //  marginLeft:70,
        //  marginRight:25,
        //  transition:'transform 2s',

        //  '&:hover':{
        //     boxShadow:'0 0 30px rgba(0,0,0.5)',
        //     transform:'scale(0.9)'  
        //  }
    },

    Btn:{
        display:'flex',
         justifyContent:'center', 
         background:'#c92532',
          alignItems:'center', 
          width:170,
           height:60,
            fontFamily:'Poppins',
            color:'#fff',
            fontSize:20
    },
      svg:{

        width:'7%',
        display:'flex',
        justifyContent:'flex-end',
        alignSelf:'center',
        alignItems:'center',
        marginRight:40
      },
      
      text:{
        width:'100%',
        display:'flex',
        justifyContent:'flex-start',
        alignSelf:'center',
        alignItems:'flex-start',
        fontFamily:'Poppins',
        fontWeight:600,
        fontSize:32,
        flexDirection:'column'
        
      },
      trend: {
        
        
        transition: 'transform 2s',

        '&:hover': {
            boxShadow:'0 0 10px rgba(0,0,0.5)',
            transform: 'scale(0.9)'
        }
    },
     
    milestone:{
      width:120, height:120, borderRadius:70,marginRight:50,
      transition: 'transform 2s',

        '&:hover': {
            // boxShadow:'0 0 30px rgba(0,0,0.5)',
            transform: 'scale(1.1)'
        }
    },

    milestone2:{
      width:400, height:100,marginRight:50,
      transition: 'transform 2s',

        '&:hover': {
            // boxShadow:'0 0 30px rgba(0,0,0.5)',
            transform: 'scale(1.1)'
        }
    }
})
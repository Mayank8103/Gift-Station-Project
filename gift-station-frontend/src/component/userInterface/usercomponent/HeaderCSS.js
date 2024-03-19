import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles({

    appbar: {
        display: 'flex',
        background: 'Black',
        alignItems: 'Left',
        justifyContent: 'center',
        height: 50


    },

    input: {
        display: 'flex',
        borderRadius: 5,
        height: 40,
        width: 300,
        border: "none",
        outline: 1,
        padding: " 0 15px 0 30px",
        fontFamily: 'Poppins',
        fontWeight: 500,
        fontSize: 18
    },

    searchbar: {
        display: 'flex',
        marginTop: 20,
        marginLeft: 60,
        height: 50,
        width: 900,
        alignItems: 'center',
        justifyContent: "space-evenly",
        borderRadius: 5,
        fontFamily: 'Poppins',
        fontWeight: 500,
        fontSize: 18,
        border: "solid 0.5px #111",
        justifyContent: 'space-evenly',
        "&:hover": {
            border: "solid 1px #0076d7",
        },

        
    },
    linebar: {
        width:'80%',
        fontSize: 22,
        fontFamily: "Poppins",
        fontWeight: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingTop:30,
        paddingLeft:70,
        marginLeft:'8%',
        // marginRight:30
        // "&:hover": {
        //     border: "solid 1px #0076d7",
        //     fontSize:22,
        //     fontFamily:"Poppins",
            
        // },
    },
    text:{
         fontFamily:'Poppins',
         fontWeight:500,
         cursor:'pointer',
         fontSize:16,
         marginBottom:40,
         transition:'transform 2s',
         '&:hover':{
            
            transform:'scale(1.0)' ,
            color:'#ea8685' 
         }

    }


})
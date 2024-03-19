import { makeStyles } from "@mui/styles";


export const useStyles = makeStyles({

    tab: {
        width:400,
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: 18,
        padding: 15,
        paddingLeft: 70,
        display:'flex',
        textAlign:'center'
    },

    tabBar:{
        border:'1px solid #dfe6e9',
        borderBottom: 'none',
        marginLeft: 2,
        fontFamily: 'Poppins',
        fontWeight: 600,
        fontSize: 18,
        "&:hover": {
            background: '#fff'
        }
    }


})
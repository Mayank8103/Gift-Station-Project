import { makeStyles } from "@mui/styles";


export const useStyles = makeStyles({


    text: {

        display: 'flex',
        alignSelf: 'center',
        fontFamily: 'Poppins',
        fontSize: 20,
        fontWeight: 400,
        justifyContent: 'center',
        marginBottom: 20,
        alignItems: 'center'

    },
    text2: {

        display: 'flex',
        alignSelf: 'center',
        fontFamily: 'Poppins',
        fontSize: 20,
        fontWeight: 400,
        justifyContent: 'center',
        marginBottom: 40

    },

    img: {
        // background:'#bdc3c7', 
        width: 400,
        height: 450,
        marginLeft: 30,
        marginTop: 40
    },
    img1: {
        width: 500,
        height: 450,
        marginLeft: 40,
        marginTop: 40
    },
    img3: {
        width: 500,
        height: 450,
        marginLeft: 60,
        marginTop: 80,
        paddingTop: 50
    },
    imgcss: {
        width: '28vw',
        height: '56vh',
        marginBottom: 20,
        transition: 'transform 2s',

        '&:hover': {
            // boxShadow:'0 0 30px rgba(0,0,0.5)',
            transform: 'scale(0.9)'
        }

    },

    textimg: {

        display: 'flex',
        alignSelf: 'center',
        fontFamily: 'Poppins',
        fontSize: 20,
        fontWeight: 400,
        justifyContent: 'center',
        marginBottom: 20

    },
    per1: {
        width: '32vw',
        height: '60vh',
        cursor: 'pointer',
        transition: 'transform 2s',

        '&:hover': {
            // boxShadow:'0 0 30px rgba(0,0,0.5)',
            transform: 'scale(0.9)'
        }


    },
    midimg: {
        transition: 'transform 2s',
        '&:hover': {
            // boxShadow:'0 0 30px rgba(0,0,0.5)',
            transform: 'scale(0.9)'
        }
    },

    per: {
        position: 'absolute',
        "& img": {
            position: "absolute",
            // display: "none"
        },

    },


    endimg: {
        width: '25vw',
        height: '55vh',
        marginTop: 50,
        padding: 40,
        transition: 'transform 2s',

        '&:hover': {
            // boxShadow:'0 0 30px rgba(0,0,0.5)',
            transform: 'scale(0.9)'
        }

    },

    heading: {

        fontFamily: 'Poppins',
        fontWeight: 600,
        fontSize: 24,
        marginTop: 20,
        display: 'flex',
        justifyContent: 'flex-start',
        alignSelf: 'center'

    },
    heading2: {

        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: 18,
        marginTop: 20,
        display: 'flex',
        alignContent: 'space-evenly',
        marginRight: 40,
    },

   price:{
    fontFamily: 'Poppins',
        fontWeight: 300,
        fontSize: 14,
   },

   offer:{

    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: 18,
   },

    heading3: {

        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: 18,
        marginTop: 20,
        display: 'flex',
        justifyContent: 'flex-end',
        alignSelf: 'end',
        marginRight: 70,
        // justifyItems:'self-end',
        // flexDirection:'row'

    },
    eyeimg: {
        width: '2vw',
        height: '5vh',

    },
    image: {
        width: '45vw',
        // margin:5,
        marginTop: 40,
        marginRight: 10
    },
    footertxt: {
        fontFamily: 'Poppins',
        fontWeight: 550,
        fontSize: 24,
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'center'
    },
    footertxt2: {
        fontFamily: 'Poppins',
        fontWeight: 550,
        fontSize: 24,
        marginTop: 50,
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 10,
        textAlign:'center'
    },
    smallfont: {
        fontFamily: 'Poppins',
        fontWeight: 500,
        fontSize: 18,
        display: 'flex',
        justifySelf: 'center',
        marginBottom: 40,
        textAlign:'center'
    },
    
    buttonCss: {
        marginTop:50,
        // background: '#c92532',
        height: 60,
        width: '80%',
        marginRight: 40,
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: 18,

        backgroundImage: "linear-gradient(to right, #fc466b 0%, #ef7533  51%, #cf072c  100%)",
        margin: "10px",
        padding: "15px 45px",
        textAlign: "center",
        textTransform: "uppercase",
        backgroundSize: "200% auto",
        color: "white",
        boxShadow: "0 0 20px #eee",
        borderRadius: "10px",
        display: "block",
        "&:hover": {
            transition: "0.8s",
            backgroundPosition: "right center", /* change the direction of the change here */
            color: "#fff",
            textDecoration: "none",
        }
    },

    button2Css: {
        marginTop: 40,
        // background: '#c92532',
        height: 40,
        width: 20,
        // marginRight: 40,
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize:12,

        backgroundImage: "linear-gradient(to right, #fc466b 0%, #ef7533  51%, #cf072c  100%)",
        margin: "10px",
        // padding: "15px 45px",
        textAlign: "center",
        textTransform: "uppercase",
        backgroundSize: "200% auto",
        color: "white",
        boxShadow: "0 0 20px #eee",
        borderRadius: "10px",
        display: "block",
        "&:hover": {
            transition: "0.8s",
            backgroundPosition: "right center", /* change the direction of the change here */
            color: "#fff",
            textDecoration: "none",
        }
    },


    imgtext:{

    }

})




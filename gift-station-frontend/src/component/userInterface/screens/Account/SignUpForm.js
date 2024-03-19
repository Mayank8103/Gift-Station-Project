import { useNavigate } from "react-router-dom";
import { useStyles } from "./SignupCSS"
import { Button,Checkbox } from "@mui/material";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';


export default function SignUpForm(){

  var navigate = useNavigate()

  function breadcrump(){
    return(
  <div role="presentation" >
  <Breadcrumbs aria-label="breadcrumb">
   
  <Link
        underline="hover"
        color="inherit"
        href="/home"
      >
        HOME
      </Link>
  <Typography color="text.primary">Account</Typography>
   
  </Breadcrumbs>
</div>)
 }


    var classes = useStyles()
    return(
        <div>
             <div style={{width:'100%', height:40, background:'#f5f5f5', marginTop:10}}>
                <div style={{marginLeft:80,paddingTop:5}}>
              {breadcrump()}
              </div>
              <div style={{display:'flex', 
              justifyContent:'center',
               alignSelf:'center',
                fontFamily:'Poppins',
                 fontWeight:600,
                 fontSize:20,
                 marginTop:80,
                 marginBottom:50
                 }}>
                CREATE AN ACCOUNT
              </div>
              <div className={classes.form}>
                <input type='text' placeholder='First Name' 
                    className={classes.inputbox}
                />
                <input type='text' placeholder='Last Name' 
                    className={classes.inputbox}
                />
               <input type='text' placeholder='Mobile Number' 
                    className={classes.inputbox}
                />
              <input type='password' placeholder='Password' 
                    className={classes.inputbox}
                />
                <div style={{display:'flex', flexDirection:'row',marginTop:10}}>
                <Checkbox />
                <div style={{display:'flex', fontFamily:'Poppins',fontWeight:400,marginTop:10,justifyContent:'center'}}>
                Subscribe to stay updated with new products and offers!
                </div>
                </div>
                <Button 
                 variant="contained" 
                style={{marginTop:10,
                background:'#c92532',
                height:40,
                width:550,
                fontFamily:'Poppins',
                fontWeight:400,
                fontSize:16,
                }}
                >Submit</Button>


                </div>
              </div>
        </div>
    )
}
import * as React from 'react';
import { Paper } from "@material-ui/core";
import { Button } from "@mui/material";
import { useStyles } from "./LoginFormCSS";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Otp from '../../usercomponent/Otp';
import Swal from 'sweetalert2';


export default function LoginForm() {


  const [number, setNumber] = useState('')
  const [otpDialoge, setOtpDialoge] = useState(false)
  const [otp, setOtp] = useState('')
  const [name, setName] = useState('')
  const [refresh, setRefresh]= useState(false)

  const pageRefresh=()=>{
    setRefresh(!refresh)
}
   
const clear=()=>{
  setName("")
  setNumber("")
}


  const handleClick = () => {
    setOtpDialoge(true);

    generateOTP()
    pageRefresh()

   
  };

  const generateOTP = () => {

    var gotp = parseInt(Math.random() * 899999) + 100000
    console.log("OTP:",gotp)
    setOtp(gotp)
    pageRefresh()

  }


  var navigate = useNavigate()
  const handleNavigate = () => {
    navigate(-1)
  }

  const handleSubmit = () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Congratulations !! ',
      text: 'You Got Free MemberShip',
      showConfirmButton: false,
      timer: 1500
    })
  }


  function breadcrump() {
    return (
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
  return (
    <div>
      <div style={{ width: '100%', height: 40, background: '#f5f5f5', marginTop: 10 }}>
        <div style={{ marginLeft: 80, paddingTop: 5 }}>
          {breadcrump()}
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignSelf: 'center',
          fontFamily: 'Poppins',
          fontWeight: 600,
          fontSize: 20,
          marginTop: 80,
          marginBottom: 50
        }}>
          My Account

        </div >
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: 20, justifyContent: 'center' }}>
          <Paper className={classes.box}>
            <div className={classes.content}>
              <div>
                LOGIN
              </div>
              <div style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: 400, marginTop: 20, marginRight: 10 }}>
                If you have an account, please log in
              </div>
              <input type='text' placeholder='Name' value={name} onChange={(event) => setName(event.target.value)}
                className={classes.inputbox}
              />
              <input type='text' placeholder='mobile Number' value={number} onChange={(event) => setNumber(event.target.value)}
                className={classes.passbox}
              />
              

                <Button onClick={handleClick}
                  disabled={number.length !== 10 }
                  variant="contained"
                  style={{
                    width: '22vw',
                    marginTop: 20,
                    background: '#c92532',
                    height: 50,
                    fontFamily: 'Poppins',
                    fontWeight: 400,
                    fontSize: 16,
                  }}
                >Sign In</Button>
              
              {/* <a style={{ display: 'flex', alignSelf: 'center', marginTop: 20 }}>Forgot Password?</a> */}
            </div>
          </Paper>
          <Paper className={classes.box2}>
            <div className={classes.content}>
              New Customer?
              <div style={{ fontFamily: 'Poppins', fontSize: 18, fontWeight: 400, marginTop: 25, marginRight: 25, alignItems: 'center' }}>
                Registering for this site allows you to access your order status and history. We’ll get a new account set up for you in no time. For this will only ask you for information necessary to make the purchase process faster and easier

                Shipping & Contact
              </div>
              <Button onClick={handleSubmit}
                variant="contained"
                style={{
                  marginTop: 30,
                  background: '#c92532',
                  height: 50,
                  width: 300,
                  fontFamily: 'Poppins',
                  fontWeight: 400,
                  fontSize: 16, cursor: 'pointer',
                }}
              >Join MemberShip </Button>
            </div>
          </Paper>
        </div>

      </div>
      <Otp pageRefresh={pageRefresh} number={number} open={otpDialoge} setOpen={setOtpDialoge} otp={otp} name={name} />

    </div>
  )
}
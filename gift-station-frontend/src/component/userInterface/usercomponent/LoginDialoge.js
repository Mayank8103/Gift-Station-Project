
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Slide from '@mui/material/Slide';
import { useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import Otp from './Otp';
import { useEffect } from 'react';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginDialoge(props) {

  
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState('')
  const [otpDialoge, setOtpDialoge] = useState(false)
  const [otp, setOtp] = useState('')
  const [name, setName] = useState('')


  const generateOTP = () => {

    var gotp = parseInt(Math.random() * 899999) + 100000
    alert(gotp)
    setOtp(gotp)

  }

  useEffect(function () {

  }, [])


  const handleClick = () => {
    setOtpDialoge(true);
    props.setState(false)
    generateOTP()
  };

  const handleClose = () => {

    setOpen(false);
    props.setState(false)
  };


  return (
    <div>

      <Dialog style={{ backdropFilter: "blur(3px)", }}
        PaperProps={{
          sx: {
            borderRadius: 8, width: 480, height: 350,
            backgroundColor: "#fff",
            // backgroundImage: "linear-gradient(45deg, #FBDA61 0%, #e46161 100%)"
          }
        }}
        open={props.state}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">

        <DialogContent>

          <div>
            <div style={{ display: 'flex', fontFamily: 'Poppins', fontSize: 16, flexDirection: 'row', }}>
              {/* <img src='/assets/mygift.avif' style={{ width: 200, }} /> */}
              {/* <div>  {"Gift-Station"}</div> */}
              <ArrowBackIcon onClick={handleClose} style={{ margin: '5%' }} />
              <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'center' }}>
                <h2>  Verify Mobile number </h2>
              </div>
            </div>
            <div style={{ margin: '5%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>

              <div>

                <TextField fullWidth value={name} variant='standard'
                  hiddenLabel placeholder='Enter Name'
                  onChange={(event) => setName(event.target.value)}
                  style={{ background: '#fff', borderRadius: 10 }}
                  InputProps={{
                    sx: { backgroundColor: '#fff', borderRadius: 4, },
                    startAdornment: <InputAdornment position='start'> <b>Mr./Ms</b></InputAdornment>,
                    // disableUnderline: true
                  }}
                />
              </div>
              <div style={{marginTop:'10%'}} >

                <TextField fullWidth value={number} variant='standard'
                  hiddenLabel placeholder='Enter mobile number'
                  onChange={(event) => setNumber(event.target.value)}
                  style={{ background: '#fff', borderRadius: 10 }}
                  InputProps={{
                    sx: { backgroundColor: '#fff', borderRadius: 4, },
                    startAdornment: <InputAdornment position='start'><b>+91</b></InputAdornment>,
                    // disableUnderline: true
                  }}
                />
              </div>
            </div>
            {number.length == 10 ?
              <div style={{
                width: 50,
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                background: '#c92532',
                borderRadius: 25,
                marginLeft: '45%'
              }}>
                <ArrowForwardIcon color='inherit'
                  style={{ fontSize: 34, marginTop: 10 }}
                  onClick={handleClick}

                />
              </div> : ""}
          </div>

        </DialogContent>
        <Otp number={number} open={otpDialoge} setOpen={setOtpDialoge} otp={otp} name={name}  />
        
      </Dialog>

    </div>
  );
}
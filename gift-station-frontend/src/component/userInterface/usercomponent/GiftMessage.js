import { Button, Checkbox} from "@mui/material";
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useState } from "react";
import AddressDialog from "./AddressDialog";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function GiftMessage() {


    var navigate = useNavigate()
     var user = useSelector((state)=>state.user)
     var userdata = Object.values(user)[0][0]
     var cart = useSelector((state)=>state.cart)
     var keys = Object.keys(cart)
    //  console.log("KEYS:",keys)

    const [state, setState]=useState(false)

    const handleDialog=()=>{
       setState(true)
    }

    function DateTime() {

        return (
            <>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker label="" />
                    </DemoContainer>
                </LocalizationProvider>
            </>
        )
    }

    const handlePayment = () => {
       
       navigate('/makepayment')
    };

   


    return (

        <>
            <div style={{ width: '90%', 
                          marginLeft: '10%', 
                          marginBottom: 10, 
                          height: "25%", 
                          background: '#f2f2f2', 
                          display: 'flex', 
                          justifyContent: 'center', 
                          borderRadius: 8, 
                          flexDirection: "column" }}>
                <div style={{fontFamily:'Poppins', fontSize:18,color:'WindowText', fontWeight:700,display:"flex", alignSelf:'center', marginTop:"2%", marginBottom:'2%'}}>
                    Delivery address:
                    {/* <EditLocationAltOutlinedIcon style={{fontSize:20, color:"#000"}} /> */}
                   </div>
                  <div 
                  style={{fontFamily:'Poppins', 
                            fontSize:14, 
                            fontWeight:500, 
                            display:'flex',
                            flexDirection:'column',
                            marginLeft:'10%', 
                            padding:'2%' }}>
                   <div> <b>Name:</b> {userdata?.fullname}</div>
                   <div> <b>Contact No: </b> {userdata?.mobile_number}</div>
                   <div> <b>Address: </b> {userdata?.address} {userdata?.zipcode} </div>
                   <div>{userdata?.apartment}, {userdata?.state} {userdata?.country}</div>
                </div>
                <div style={{ width: '90%', 
                               height:40, 
                               background: '#f2f2f2', 
                               flexDirection: 'row', 
                               display: 'flex', 
                               justifyContent: 'center', 
                               margin: "1%", 
                               marginRight:"4%" }}>
                    {/* <Button  variant='contained' style={{ background: '#dc2f2f', borderRadius: 5, }} onClick={handleDialog} >
                        Change
                    </Button> */}
                </div>
            </div>
            <div 
            style={{ background: '#f2f2f2', 
                      padding: '5%', 
                      borderRadius: 10, 
                      marginLeft: '10%' }} >
                <div style={{ display: 'flex', justifyContent: 'start', textTransform: 'uppercase' }}>
                    <Checkbox style={{ marginBottom: 10 }} />
                    <span style={{ marginTop: 10, fontFamily: 'Poppins', fontSize: 14 }}>
                        <b> ADD A GIFT WRAP & CARD FOR FREE</b>
                    </span>
                </div>
                <div  style={{ marginBottom: 10, fontFamily: 'Poppins', fontSize: 12 }}>
                    Gift message Note
                </div>
                <div  >
                    <textarea id="message" placeholder="Gift Message" name="w3review" rows="5" maxLength='40' cols="30" style={{ fontFamily: 'Poppins', fontSize: 12, borderRadius: 5 }}></textarea>
                </div>
                <div>
                    <input type="text" placeholder=" This Gift is from??" maxlength='20' style={{ height: 40, marginTop: 10 }} />
                </div>
                <div style={{ width: '90%', height: 75, marginTop: 20 }}>
                    Select delivery Date and Time
                    {DateTime()}
                </div>
                <div style={{ marginTop: 40 }}>
                    <Button disabled={keys.length==0} onClick={()=>handlePayment()} variant='contained' style={{ height: 50, borderRadius: 5, background: '#dc2f2f' }} >
                        Proceed To Payment
                    </Button>
                </div>
            </div>
          <AddressDialog  setState={setState} state={state}  />
        </>
    )
}
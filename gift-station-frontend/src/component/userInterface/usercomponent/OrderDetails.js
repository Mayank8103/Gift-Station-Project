import { Box, Button, Divider, Paper } from "@mui/material"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { ServerURL } from "../../services/ServerServices"


export default function OrderDetails() {
    var navigate= useNavigate()
    var location = useLocation()
    var cart = useSelector((state) => state.cart)
    var cartdata = Object.values(cart)
    // console.log("Cart Data", cartdata)

    let total = cartdata.reduce((a, b) => {
        return a + b.offerprice * b.qty
    }, 0)

    let price = cartdata.reduce((a, b) => {
        return a + b.price * b.qty
    }, 0)
     
    const handlehome=()=>{
        navigate("/home")
    }

    var orderdata = location.state.data[0]

    function data() {
        return cartdata.map((item) => {
            // console.log("ITEM", item)
            return (<>
                <Box style={{ width: '100%', marginTop: 10, padding: 5, marginLeft: '10%' }}>
                    <div style={{
                        margin: '15 2 15 5', display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 5
                    }}>
                        <div style={{ width: '20%', marginLeft: 2, }}
                        >
                            {/* <Badge badgeContent={item.qty} color='error' > */}

                            <img src={`${ServerURL}/images/${item.picture}`}
                                style={{ width: 70, height: 70 }}

                            />
                            {/* </Badge> */}
                        </div>
                        <div style={{
                            marginTop: 10,
                            fontFamily: 'Poppins',
                            fontSize: 14,
                            fontWeight: 600,
                            alignItems: 'center',
                            marginTop: 30, marginLeft: 10
                        }}>
                            {item.productname}

                        </div >



                        <div style={{
                            marginTop: 30,
                            marginLeft: 10,
                            fontFamily: 'Poppins',
                            fontSize: 14,
                            fontWeight: 600,
                        }}>
                            &#8377; {item.offerprice}
                        </div>
                    </div>
                    <Divider />

                </Box>
            </>)
        })
    }




    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', }}>

            <Paper
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignContent: 'center',
                    width: '75%',
                    fontFamily: 'Poppins',
                    padding: 20,
                    // marginTop: '5%',
                    letterSpacing: 1

                }}>
                <div style={{
                    display: 'flex',
                    alignSelf: 'center',
                    // marginTop: 5,
                    fontWeight: 600,
                    fontSize: 20,
                    marginBottom: 5,

                }}>
                    Order Details
                </div>
                <Divider />

                <div style={{
                    display: 'flex',
                    marginTop: '5%',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                }}>
                    <div style={{ display: 'flex',  
                    flexDirection: 'column', width:'40%' }}>
                         {data()}
                         </div>
                    
                    <Divider orientation='vertical' />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        flexDirection: 'column',
                        fontWeight: 600,
                        fontSize: 16,
                    }}>

                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'green' }}><b>Order Status :</b> {orderdata.order_status}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><b> Payment Mode :</b> {orderdata.payment_mode}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><b>Transaction Id : </b>{orderdata.transectionid}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <b>Delivery Status : </b>
                            {orderdata.delivery_status}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'green' }}>
                            <b>PayAmount : </b>
                            Rs. {total}</div>
                        {/* <div> : Rs. {orderdata.}</div> */}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <b>Total Amount : </b>
                            <s> Rs.{price}</s>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'red' }}>
                            <b>Save : </b>
                            Rs.{parseInt(price - total)}</div>
                        {/* <div>Order Time :{orderdata.order_time}</div> */}
                        <div style={{ display: 'flex', alignSelf: 'end', marginTop: 50, }}>
                            Thank you </div>
                            <div style={{width:'100%', height:50}}>

                            </div>
                            <Button style={{background:'#c92532', color:'#fff'}} onClick={handlehome}>Go to Home</Button>
                    </div>
                </div>
            </Paper>
        </div>
    )
}
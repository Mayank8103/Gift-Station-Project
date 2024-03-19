import { useCallback, useEffect } from "react";
import useRazorpay from "react-razorpay";
import { ServerURL, postData } from "../../services/ServerServices";
import { useSelector } from "react-redux";
import { Box, Button, Toolbar, Typography } from "@mui/material";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import Footer from "./Footer";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AppBar from '@mui/material/AppBar';
import { IconButton } from "@material-ui/core";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from "react-router-dom";

export default function Makepayment() {

    var navigate = useNavigate()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const matches_small = useMediaQuery(theme.breakpoints.down('sm'));

    var user = useSelector((state) => state.user)
    var userdata = Object.values(user)[0]
    console.log("payment user", userdata)

    var cart = useSelector((state) => state.cart)
    var cartdata = Object.values(cart)
    console.log("Paymentcart", cartdata)


    function Top() {
        return (
            <>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position='fixed'
                        style={{
                            display: 'flex', justifyContent: 'space-evenly',
                            background: "rgb(252,70,107)",
                            background: "radial-gradient(circle, rgba(252,70,107,0.6547870421677493) 0%, rgba(239,117,51,0.6828769298081987) 0%, rgba(207,7,44,0.6547870421677493) 89%)",
                            height: 45
                        }}>
                        <Toolbar>
                            {!matches ? <>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    style={{ marginLeft: '4%' }}
                                >
                                    <LocationOnIcon />
                                </IconButton>
                                <span style={{ fontFamily: 'Poppins', fontSize: 16 }}> Gwalior</span>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-evenly' }}>


                                    < div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                        fontFamily: 'Poppins',
                                        fontSize: 16,
                                        marginRight: 15
                                    }}>
                                        <CardGiftcardIcon />
                                        <span style={{ marginLeft: 5, fontFamily: 'Poppins', fontWeight: 400, fontSize: 16 }}>Gift_Station</span>
                                    </div>
                                </Typography>

                                <div style={{ display: 'flex', marginRight: 15, fontFamily: 'Poppins', fontSize: 16 }}>Track Order</div>


                            </> : <>
                                <div style={{ display: 'flex', justifyItems: 'center', marginLeft: '5%' }}>
                                </div>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-evenly' }}>


                                    < div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                        fontFamily: 'Poppins',
                                        fontSize: 16,
                                        marginRight: '5%'
                                    }}>
                                        <CardGiftcardIcon />
                                        <span style={{ marginLeft: 5, fontFamily: 'Poppins', fontWeight: 400, fontSize: 16 }}>Gift_Station</span>
                                    </div>
                                </Typography>

                            </>}
                        </Toolbar>
                    </AppBar>
                </Box>

            </>
        )
    }


    // >>>>>>>>>> Order Data >>>>>>

    const orderdetails = async (paymode, Dstatus, Ostatus) => {
        var cd = new Date()
        var date = cd.getFullYear() + "/" + (cd.getMonth() + 1) + "/" + cd.getDate();
        var time = cd.getHours() + ":" + cd.getMinutes();
        var transectionid = Date.now() + (Math.random() * 100000).toFixed();

        var body = {
            productid: cartdata[0].productid,
            userid: userdata[0].userid,
            order_date: date,
            order_time: time,
            totalAmount: total,
            // PayAmount:price,
            // saving:parseInt(price-total),
            quantity: cartdata[0].qty,
            paymentMode: paymode,
            transectionid: transectionid,
            delivery_status: Dstatus,
            order_status: Ostatus
        }

        var result = await postData("order/insert_order", body)
        console.log("After payment result", result)

        var rslt = await postData("order/show_order", { orderid: result.data })
        console.log("Order", rslt)

        navigate("/order", { state: rslt })
    }

    useEffect(function () {
        setTimeout(() => {
            handlePayment()
        }, 20000)
    },[])




    // >>>>>> Amount to pay >>>>>>>

    let total = cartdata.reduce((a, b) => {
        return a + b.offerprice * b.qty
    }, 0)

    let price = cartdata.reduce((a, b) => {
        return a + b.price * b.qty
    }, 0)


    const Razorpay = useRazorpay();

    const handlePayment = useCallback(async () => {


        const options = {
            key: "rzp_test_GQ6XaPC6gMPNwH",
            amount: total * 100,
            currency: "INR",
            name: "Gift-Station",
            description: "Test Transaction",
            image: `/assets/Gift-Station-logos_transparent.jpg`,

            handler: (res) => {
                console.log(res);
                if (res.razorpay_payment_id == undefined) {
                    orderdetails("None", "None", "None")
                }
                else {
                    orderdetails("Online", "pending", "Successful")
                }
            },
            prefill: {
                name: userdata.fullname,
                // email: "youremail@example.com",
                contact: userdata.mobile_number,
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#dc2f2f",
            },
        };

        const rzpay = new Razorpay(options);
        rzpay.open();
    }, [Razorpay]);

    return (
        <div className="App">
            {Top()}
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: '5%' }}>
                {/* <img src="/assets/Make-a-Payment.png" /> */}
                <div style={{ marginTop: 40 }} onClick={handlePayment}>
                    <img src="/assets/payment process.gif" style={{}} /></div>
                <div style={{ width: '30%', }}>
                    <Button fullWidth
                        sx={{
                            height: 50,
                            marginTop: 5,
                            background: '#dc2f2f',
                            color: '#fff',
                            "&: hover": {
                                background: '#f76b8a',
                                color: '#000'
                            }

                        }} onClick={handlePayment}>Click Here</Button>
                </div>
            </div>
            <Footer />
        </div>
    );
}
import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import React from 'react'

function CartPrice(props) {

    const [price, setPrice] = useState('')
    const [offer, setOffer] =useState('')
    const [discount, setDiscount]= useState('')
    const prices = () => {

        let offer = props.data.reduce((a, b) => {
            return a + b.offerprice * b.qty
        }, 0)

        let total = props.data.reduce((a,b)=>{

            return a+b. price*b.qty
        },0)

        setOffer(offer)
        setPrice(total)
        let discount = total- offer
         setDiscount(discount)
        props.pageRefresh()

    }

    useEffect(function () {
        prices()
        props.pageRefresh()
    }, [props])


    return (
        <div>
            <div style={{
                width: '70%',
                display: 'flex',
                justifyContent: 'space-between',

                bottom: 5,
                marginTop: '1%',
                marginLeft: '10%',
                marginRight: '5%',
                // bottom:'5%'
            }}>

                <div >

                    SubTotal: 
                </div>
                <div style={{ marginLeft: '9%' ,float: 'right' }}>

                   Rs. {price} 
                </div>
            </div>
            <div style={{ width:'70%', marginLeft: '10%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                <div >
                    <b> Discount: </b>
                </div>
                <div style={{ marginLeft: '9%' }}>

                    <b style={{ float: 'right' }}>Rs. {discount} </b>
                </div>
            </div>
            <div style={{ width:'70%', marginLeft: '10%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                <div >
                    <b> Total: </b>
                </div>
                <div style={{ marginLeft: '9%' }}>

                    <b style={{ float: 'right' }}>Rs. {offer} </b>
                </div>
            </div>


            {price != 0 ? <>
            
                {/* <Button variant='contained'       
           style={{ background: "#f76b8a", height:50,width:'70%',marginLeft:'20%',
                  marginTop:'2%',borderRadius:5
        }}
           >
             Proceed
           </Button> */}
            </> : <Button variant='text'
                style={{
                    height: 50, width: '60%', marginLeft: '20%',
                    marginTop: '2%', borderRadius: 10, color: "#f76b8a"
                }}
            >
                Cart is Empty
            </Button>}

        </div>
    )
}

export default CartPrice;
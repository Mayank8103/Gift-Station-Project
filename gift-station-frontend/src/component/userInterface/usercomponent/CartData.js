import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Badge, Box, Button, Divider, Grid, TextField } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PlusMinus from './PlusMinus';
import { ServerURL } from '../../services/ServerServices';
import CartPrice from './CartPrice';
import { useEffect, useState } from 'react';


export default function Cartdata(props) {

    const dispatch = useDispatch()
    const products = useSelector((state) => state.cart)
    const productlist = Object.values(products)
    const keys = Object.keys(products)
    const [btn,setBtn]= useState('')

    const handleDelete = (item) => {
        keys.forEach((key) => {
            dispatch({ type: "DELETE_CART", payload: [item.productlistid] })
            props.pageRefresh()
        })
    }

    useEffect (function(){
          props.pageRefresh()
    },[props])





    const list = () => (

        productlist.map((item, i) => {
            // console.log(item)
            return (

                <Box style={{ width: '95%', marginTop: 10, padding: 5, marginLeft: '10%' }}>
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
                                style={{ width: 100, height: 100 }}

                            />
                            {/* </Badge> */}
                        </div>
                        <div style={{
                            marginTop: 10,
                            fontFamily: 'Poppins',
                            fontSize: 14,
                            fontWeight: 400, alignItems:'center',
                        }}>
                            {item.productname}

                        </div >
                        <div >
                            <PlusMinus products={item} pageRefresh={props.pageRefresh} />
                        </div>


                        <div >
                            &#8377; {item.offerprice}  
                        </div>
                    </div>
                    {/* <Divider /> */}

                </Box>)
        })
    );
       
    const handleClick=()=>{
        setBtn("Created By  Mayank")
    }



    return (
        <>
                <Button onClick={handleClick}></Button>
            <div style={{
                display: 'flex', flexDirection: 'column', marginTop: '0%',
                //    background:'rgb(246 246 246)' 
            }}>
                <div style={{
                    margin: '15 2 15 5', display: 'flex',padding:15,width:'85%',
                    flexDirection: 'row', marginLeft: '10%',
                    justifyContent: 'space-between', background: '#f2f2f2',borderRadius:6,
                }}>
                    <div >
                        Product
                    </div>
                    <span >
                        Product Name
                    </span>
                    <span >
                        Quantity
                    </span>
                    <span  style={{marginRight:15}}>
                        Price
                    </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginRight: "10%" }}>
                    {list()}
                </div>
                {/* <div style={{ width: '100%', marginTop: '2%' }}>
                    <hr style={{ width: '85%', height: 0 }}></hr>
                </div> */}
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', }}>

                    <div style={{ marginTop: 20, marginBottom: '10%', display: 'flex', justifyContent: 'left', width: '75%' }}>

                        <TextField variant='outlined' placeholder="Discount Code" style={{ width: '100%', height: 10, marginTop: 20, marginLeft: '10%' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '20%', marginTop: '6%', marginRight: '10%' }}>

                        <Button variant='contained'
                            sx={{
                                display: 'flex',
                                // justifyContent: 'center',
                                background: '#dc2f2f',
                                alignItems: 'center',
                                width: '70%',
                                height: '9vh',
                                fontFamily: 'Poppins',
                                color: '#fff',
                                fontSize: 16,
                                borderRadius: 2,
                                textTransform: 'capitalize',
                                "&: hover": {
                                    backgroundColor: '#be3144',
                                    color: '#fff'
                                }
                            }}>
                            Apply
                        </Button>
                    </div>
                </div>

                <div style={{ width: '100%', marginTop: '2%' }}>
                    <hr style={{ width: '85%', height: 0 }}></hr>
                </div>

                {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: "10%" }}> */}

                <div style={{
                    width: '100%',
                    marginTop: '2%',
                    fontFamily: 'Poppins',
                    fontSize: 14
                }}>

                    <CartPrice data={productlist} pageRefresh={props.pageRefresh} />
                  <div style={{display:'flex', 
                            justifyContent:'center', 
                            // marginRight:'15%',
                            fontSize:14, fontWeight:500
                            }} >{btn}</div>
                </div>


                {/* </div> */}
            </div>



        </>
    )
}
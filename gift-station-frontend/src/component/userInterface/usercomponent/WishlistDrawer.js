import * as React from 'react';
import { Box, Divider, Drawer } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ServerURL } from '../../services/ServerServices';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PlusMinus from './PlusMinus';
import Price from './Price';


export default function WishlistDrawer(props) {

    const dispatch = useDispatch()
    const products = Object.values(props.products)
    const keys = Object.keys(props.products)


    const handleDelete = (item) => {
        keys.forEach((key) => {
            dispatch({ type: "DELETE_CART", payload: [item.productlistid] })
            props.pageRefresh()
        })
    }

    const [state, setState] = useState(false);

    useEffect(function () {
        setState(props.wishOpen)
       
    }, [props.wishOpen])

    function handleClose () {
        setState(false)
        props.setWishOpen(false)
    }



    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState(open);
    };
    const list = () => (

        products.map((item, i) => {
            // console.log(item)
            return (

                <Box style={{ width: 350, marginTop: 10, padding: 5 }}>
                    <div style={{
                        margin: '15 2 15 5', display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        border: "solid 2px #ec729c", padding: 5
                    }}>
                        <div style={{ width: '20%', marginLeft: 2, }}
                        >
                            <img src={`${ServerURL}/images/${item.picture}`}
                                style={{ width: 100, height: 100 }}

                            />
                        </div>
                        <div style={{
                            display: 'flex', flexDirection: 'column',
                            marginTop: 10,
                            width: '50%',
                            marginLeft: 5,
                            fontFamily: 'Poppins',
                            fontSize: 14,
                            fontWeight: 400
                        }}>
                            <b>  {item.productname} </b>
                            <div>
                                <b>  &#8377; {item.offerprice}  </b>

                            </div>
                            <div>
                                <PlusMinus products={item} pageRefresh={props.pageRefresh} />
                            </div>
                        </div>


                        <div style={{ display: 'flex', alignItems: 'end' }}>
                            <DeleteOutlineIcon onClick={() => handleDelete(item)} />
                        </div>
                    </div>
                    <Divider />

                </Box>)
        })
    );
    return (
        <div>

            <React.Fragment key={'right'}>

                <Drawer
                    anchor={'right'}
                    open={state}
                    onClose={toggleDrawer('right', true)}
                    //  onClick={handleClose}
                >
                    <div style={{ width: '25vw', display: 'flex', justifyContent: 'space-between', marginTop: '4%', borderBottom: "solid 1px #dfe6e9" }}>
                        <div style={{ fontFamily: 'Poppins', fontWeight: "bold", fontSize: 20, marginLeft: '3%', marginBottom: '2%' }}>
                            Your Cart({keys.length})
                        </div>
                        <div style={{ marginRight: "3%" }}>
                            <ClearIcon onClick={handleClose} />
                        </div>

                    </div>
                    {list()}
                    <Price data={products} pageRefresh={props.pageRefresh} state={state} setState={setState} close={props.wishOpen} setclose={props.setWishOpen} />

                </Drawer>
            </React.Fragment>
        </div>
    )
}
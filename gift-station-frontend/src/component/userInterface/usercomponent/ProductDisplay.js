import { Button, Grid, Paper, Rating, Stack } from "@mui/material"
import { useStyles } from "./ProductCSS"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ServerURL, postData } from "../../services/ServerServices";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";




export default function ProductDisplay(props) {
    var classes = useStyles()
    var navigate = useNavigate()
    var location = useLocation()
    //     var data= JSON.parse(location.state.data)
    // alert("Product:",location.state.subcategoryid )


    const [subCategoryId, setSubCategoryId] = useState(location.state.subcategoryid)

    const dispatch = useDispatch()

    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));

    const [productData, setProductData] = useState([])


    const handleDispatch = (item) => {
        item['qty'] = 1
        dispatch({ type: 'ADD_CART', payload: [item.productlistid, item] })
        props.setRefresh(!props.refresh)
    }


    const rating = () => {
        return (
            <Stack spacing={2}>
                <Rating name="half-rating" defaultValue={4.5} precision={.5}
                    style={{ color: '#fdc57b', fontSize: sm ? 14 : 18 }} />

            </Stack>
        );
    }

    const handleProduct = (item) => {
        navigate('/allproduct', { state: { productid: item.productid } })
        // alert("ALL PRODUCT",item.productid)
    }

    const fetch_product_data = async () => {
        var result = await postData('userInterface/fetch_product_data', { subcategoryid: subCategoryId })
        setProductData(result.data)

    }

    useEffect(function () {
        fetch_product_data()
    }, [])


    function image() {
        return productData.map((item) => {
            // alert(item.productid)
            return (
                <>
                    <Paper style={{
                        display: 'flex',
                        width: sm ? 180 : md ? 200 : 250,
                        height: sm ? 300 : md ? 350 : 350,
                        background: '#fff', margin: '1%', marginTop: 50, justifyContent: 'center'
                    }}

                    >
                        <div style={{ display: 'flex', flexDirection: 'column' }}>

                            <div onClick={() => handleProduct(item)}>
                                <img src={`${ServerURL}/images/${item.picture}`}
                                    className={classes.midimg}
                                    style={{
                                        width: sm ? 170 : md ? 200 : 230,
                                        height: sm ? 150 : md ? 200 : 250, margin: 5
                                    }}
                                />
                            </div>
                            <div style={{
                                fontFamily: 'Poppins',
                                fontWeight: 400,
                                fontSize: sm ? 12 : md ? 14 : 18,
                                display: 'flex',
                                justifyContent: 'center',
                                textAlign: 'center',
                                color: '#45171d',
                                // background: 'rgb(252,70,107)',
                                // background: '-webkit-linear-gradient(90deg, rgba(252,70,70,1) 0%, rgba(151,154,50,1) 50%, rgba(224,65,48,1) 70%)',
                                // webkitBackgroundClip: "text",
                                // WebkitTextFillColor: "transparent",
                            }}>
                                {item.productname}

                            </div>
                            <div style={{cursor:'pointer',
                                display: 'flex', justifyContent: 'center',
                                fontSize: 18, marginTop: 10,
                                background: '-webkit-linear-gradient(rgb(188, 12, 241), rgb(212, 4, 4))',
                                webkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }} onClick={() => handleProduct(item)}>
                                View More
                            </div>

                            <div style={{
                                display: 'flex', justifyContent: 'space-evenly'
                                , alignItems: 'end', marginTop: sm ? 35 : md ? 30 : 25,
                                // position:'absolute', 
                                bottom: '1%', marginRight: sm ? 10 : md ? 10 : 0
                            }}>
                                {/* <span style={{ marginTop: 7, marginRight: 25, marginLeft: 5 }}>
                                    {rating()}
                                </span>
                                <span style={{ fontFamily: 'Poppins', color: '#393e46' }} >

                                    <Button sx={{
                                        border: '1px solid #e46161',
                                        justifyContent: 'center', color: '#e46161',
                                        height: 30,
                                    }} onClick={() => handleDispatch(item)} >
                                        ADD
                                    </Button>
                                </span> */}
                            </div>
                        </div>
                    </Paper >


                </>
            )
        })
    }


    return (
        <div>
            <Grid container spacing={2}>
                <div style={{
                    width: '100%',
                    display: 'flex', justifyContent: 'center', marginLeft: 20,
                    flexWrap: 'wrap'
                }}>
                    {image()}
                </div>

            </Grid>
        </div >
    )
}


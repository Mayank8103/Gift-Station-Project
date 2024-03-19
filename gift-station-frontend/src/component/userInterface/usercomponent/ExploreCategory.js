import { createRef, useEffect, useState } from "react"
import { useStyles } from "./FrontviewCSS"
import { ServerURL, getData } from "../../services/ServerServices"
import { Button, Divider, Grid, Paper, Rating, Stack } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";


export default function ExploreCategory() {

    var slider = createRef()
    var classes = useStyles()
    var navigate = useNavigate()
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));

    const [trending, setTranding] = useState([])

    var settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: sm ? 2 : md ? 3 : 4,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        autoplay: true,

    };

    const rating = () => {
        return (
            <Stack spacing={2}>
                <Rating name="half-rating" defaultValue={4.5} precision={.5}
                    style={{ color: '#fdc57b' }} />

            </Stack>
        );
    }

    const fetchTrendingProducts = async () => {
        var result = await getData('userInterface/fetch_category_data')
        setTranding(result.data)
    }
    useEffect(function () {
        fetchTrendingProducts()
    }, [])

    const handleTrending = (item) => {
        navigate("/subcatedisplay", { state: { categoryid: item.categoryid } })
    }

    const fillTrendingProduct = () => {
        return (
            trending.map((item) => {
                return (

                    < >
                        <Paper style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginLeft: '2%', padding: 5,
                            width: sm ? 180 : md ? 200 : 250,
                            height: sm ? 220 : md ? 260 : 300,
                            /* borderRadius:280,*/
                            background: '#fff',

                            marginTop:sm?'0%': '5%',
                            alignContent: 'center',

                        }}>
                            <div style={{ width: '100%' }}

                            >
                                

                                <img src={`${ServerURL}/images/${item.categoryicon}`}
                                    onClick={() => handleTrending(item)}
                                    style={{
                                        width: sm ? 170 : md ? 200 : 240,
                                        height: sm ? 170 : md ? 200 : 240,
                                        // borderRadius: 120,
                                        marginLeft: 5,
                                        marginTop:5

                                    }}
                                />
                                <div
                                    style={{
                                        fontFamily: 'Poppins',
                                        fontWeight: 400,
                                        fontSize: sm ? 12 : md ? 14 : 18,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        color: '#680747',
                                        marginTop: 10
                                    }}
                                >
                                    {item.categoryname}


                                </div>

                                {/* <Divider/> */}
                                <div style={{
                                    display: 'flex', justifyContent: 'center'
                                    , marginTop: 10,
                                    position: 'absolute',
                                    bottom: sm ? 0 : '5%'
                                }}>
                                    {/* <span style={{ marginTop: 7, marginRight: 25 }}>
                    {rating()}
                  </span> */}
                                    {/* <span style={{
                      display:'flex',
                       fontFamily: 'Poppins',
                        color: '#393e46', 
                        marginTop: sm ? 0 : 5,
                         justifyContent: 'center', fontSize: 28 }} >

                      <Button fullWidth sx={{
                        // border: '1px solid #e46161',
                        justifyContent: 'center', color: '#83580b',
                        height: 30, width: 200, height: 40,marginLeft:2,
                        // '&:hover':{
                        //   // backgroundColor:'#e46161',
                        //   color:'#c3195d',
                        // ,border: '1px solid #e46161',
                        // }
                      }} >
                        View Product
                      </Button>
                    </span> */}
                                </div>
                            </div>
                        </Paper>
                    </>
                )
            })
        )
    }



    return (
        <div  >


            {/* <Slider ref={slider} {...settings}>
      </Slider> */}
            <Grid container spacing={2}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%', flexWrap: 'wrap', marginTop: sm ? '0%' : md ? '15%' : 0
                }}>
                    {fillTrendingProduct()}
                </div>

            </Grid>
        </div>
    )
}
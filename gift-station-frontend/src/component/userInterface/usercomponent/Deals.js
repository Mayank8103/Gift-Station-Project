import { createRef, useEffect, useState } from "react"
import { useStyles } from "./FrontviewCSS"
import { ServerURL, getData } from "../../services/ServerServices"
import { Button, Divider, Grid, Paper, Rating, Stack } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";


export default function Deals() {

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
    var result = await getData('userInterface/fetch_deals_product_data')
    setTranding(result.data)
  }
  useEffect(function () {
    fetchTrendingProducts()
  }, [])

  const handleTrending = (item) => {
    navigate('/allproduct', { state: { productid: item.productid } })
  }

  const fillTrendingProduct = () => {
    return (
      trending.map((item) => {
        return (
          <Grid item xs={sm ? 6 : md ? 4 : 4}>
            <div  >
              <Paper style={{
                display: 'flex',marginLeft:'5%',
                width:sm?180:md?200: 250,
                height:sm?250:md?350:340,
                 background: '#fff', 
                 margin: '1%', marginTop: 50, 
                 justifyContent: 'center',
                 transition: 'transform 2s',

                 '&:hover': {
                   // boxShadow:'0 0 30px rgba(0,0,0.5)',
                   transform: 'scale(0.9)'
                 }
              }}>
                <div style={{ width: '100%' }}
                  onClick={() => handleTrending(item)}
                >
                <div style={{width:'100%', 
                             display:'flex',
                             justifyContent:'center', 
                             fontFamily:'Poppins', 
                             fontSize:18,margin:'2%',    
                             }} >
                  Best Deals
                </div>
                  <img src={`${ServerURL}/images/${item.picture}`}
                    className={classes.trend}
                    style={{
                      width: sm ? 170 : md ? 200 : 240,
                      height: sm ? 150 : md ? 200 : 230, 
                      // borderRadius:120,
                      margin: 5,
                      transition: 'transform 2s',

                      '&:hover': {
                        boxShadow:'0 0 30px rgba(0,0,0.5)',
                        transform: 'scale(0.9)'
                      }
                    }}
                  />
                  <div
                    style={{
                      fontFamily: 'Poppins',
                                fontWeight: 400,
                                fontSize:sm?12:md?14: 18,
                                display: 'flex',
                                justifyContent: 'center',
                                textAlign: 'center',
                                color: '#680747',
                                marginTop:25
                    }}
                  >
                    {item.productname}
                   

                  </div>

                  {/* <Divider/> */}
                  <div style={{
                    display: 'flex', justifyContent: 'center'
                    , marginTop: 10,
                    position: 'absolute',
                    bottom:sm?0: '5%'
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
            </div>
          </Grid>
        )
      })
    )
  }



  return (
    <div >

      <Slider ref={slider} {...settings}>
        {fillTrendingProduct()}
      </Slider>



      <div>
      </div>
    </div>
  )
}
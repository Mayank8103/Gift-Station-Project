import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { createRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { getData, ServerURL } from "../../services/ServerServices";
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';



export default function MainSlider() {


 const [images, setImages]= useState([])

 const fetchBannerImages=async()=>{
             var result = await getData('banner/fetch_banner_images')
     var dataimages=result.data[0].image
     var im= dataimages.substring(0,(dataimages.length)-1).split(',')
    
     setImages(im)
 }
 
   useEffect (function(){
         fetchBannerImages()
   },[])

    var slider = createRef()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed:!matches?2000:1000,
        autoplay: true,

    };

    function handleLeftClick() {
        slider.current.slickNext()
    }
    function handleRightClick() {
        slider.current.slickPrev()
    }

    
    function playImages() {
        return images.map((item) => {
            return (
                <div style={{ display: 'flex', width:'100%', justifyContent:'center', paddingLeft:'2%', background:'red', outline:"none"}}>
                    <img src={`${ServerURL}/images/${item}`}
                        style={{ width:'100%', height:sm?200: matches?350:450, paddingTop: 20, marginBottom:sm?0: 20, }}
                    />
                    <div>

                    </div>
                </div>

            )
        })
    }

    return (
        <div>
            {!matches ? <>
                {/* <KeyboardArrowLeftOutlinedIcon onClick={handleLeftClick} style={{ fontSize: 40, position: 'absolute', left: '2%', top:'65%', zIndex: 1,color:'darkslategrey' }} /> */}
                
            </> : <></>}
            <Slider ref={slider} {...settings}>
                {playImages()}
            </Slider>
            {!matches ? <>
                {/* <KeyboardArrowRightOutlinedIcon onClick={handleRightClick} style={{ fontSize: 40, position: 'absolute', right:'2%', top:'65%', zIndex: 1, color:'darkslategrey' }} /> */}
            </>:<></>}

        </div>

    )
}
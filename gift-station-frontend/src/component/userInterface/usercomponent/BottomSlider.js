import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { createRef } from "react";
import Slider from "react-slick";
import { ServerURL } from "../../services/ServerServices";
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import { useStyles } from "./BottomSliderCSS";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';



export default function BottomSlider() {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    var slider = createRef()
    var classes = useStyles()

    var settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow:sm?2: matches ? 3 : 7,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        autoplay:true,

    };

    function handleLeftClick() {
        slider.current.slickNext()
    }
    function handleRightClick() {
        slider.current.slickPrev()
    }

    var images = [{
        id: 1,
        img: 'india_rakhi.webp',
        name: 'India'
    },
    {
        id: 2,
        img: 'australia_rakhi.webp',
        name: 'Australia'
    },
    {
        id: 3,
        img: 'canada_rakhi.webp',
        name: 'Canada '
    },
    {
        id: 4,
        img: 'germany_rakhi.webp',
        name: 'Germany '
    },
    {
        id: 5,
        img: 'singapore_rakhi.webp',
        name: 'Singapore '
    },
    {
        id: 6,
        img: 'uk_rakhi.webp',
        name: 'UK '
    },
    {
        id: 7,
        img: 'usa_rakhi.webp',
        name: 'USA '
    },
    {
        id: 8,
        img: 'uae_rakhi.webp',
        name: 'UAE '
    },
    {
        id: 9,
        img: 'world_rakhi.webp',
        name: 'world'
    }
    ]
    function playImages() {
        return images.map((item) => {
            return (
                <div style={{ display: 'flex' }}>
                    <div className={classes.pictures}
                        style={{
                            width:sm?220:matches?220: 180,
                            height:sm?220:matches?220: 216,
                            borderRadius:sm?120:matches?180: 10,
                        }}
                    >
                        <img src={`${ServerURL}/images/${item.img}`}
                            style={{
                                width: 180,
                                height: 216,
                            

                            }}
                            className={classes.grow}
                        />

                    </div>
                    <div
                    
                    style={{ 
                        fontSize:sm?16: 18,
                        fontWeight:sm?450: 700,
                        fontFamily:'cursive',
                        // color:'',
                         display:'flex',
                         width:'100%',
                         justifyContent:'center',
                        //   marginRight:sm?0:0,
                        //  marginLeft:sm?35:matches? 50:70,
                        // marginTop: sm?24:24,
                    }}
                    >
                        {item.name}
                    </div> 
                </div>

            )
        })
    }

    return (
        <div>
            {!matches ? <>
                {/* <KeyboardArrowLeftOutlinedIcon onClick={handleLeftClick} style={{ position: 'absolute', left: '3%', top:'40%', zIndex: 1, fontSize: 50, color:'darkslategrey' }} /> */}
            </> : <></>}

            <Slider ref={slider} {...settings}>
                {playImages()}
            </Slider>
            {!matches ? <>
                {/* <KeyboardArrowRightOutlinedIcon onClick={handleRightClick} style={{ fontSize: 50, position: 'absolute', right: '3%', top: '450%', zIndex: 1,color:'darkslategrey' }} /> */}
            </> : <></>}
        </div>

    )
}
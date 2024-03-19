import { Grid } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { ServerURL } from "../../services/ServerServices";
import { createRef, useEffect, useState } from "react";
import Slider from "react-slick";



export default function SelectProduct(props) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));


    var slider = createRef();


    var settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 1500,
        autoplay:true,
        arrows: false

    };
    // const [productListData, setProductlistData] = useState([])
    // const [productId, setProductId] = useState(location.state.productid)
    const [image, setImage] = useState([])



    useEffect(function () {
        fetch_productlist()
    }, [props.data])



    var data = props.data
    // console.log("DIS",data)
    const fetch_productlist = async () => {
        // console.log("Image:", data)

        var dataimages = data[0].image
        var im = dataimages.substring(0, (dataimages.length) - 1).split(',')
        setImage(im) 

    }

    function playImages() {

        // alert(JSON.stringify(image))
        // console.log(image)
        return image.map((item) => {
            return (
                <div 
                style={{ width:matches?'100%': '80%', 
                display: 'flex', 
                justifyContent: 'center', 
                height:sm?350:matches? 600: 600 }}>
                    <img src={`${ServerURL}/images/${item}`}
                        style={{ width:sm?300:matches?600: 450, 
                            height:sm?300:matches?600:450, 
                            paddingTop: 20,
                            marginLeft: matches?'10%':'15%', 
                            marginTop: '5%' }}
                    />
                    <div>

                    </div>
                </div>
            )
        })
    }

    function handleLeftClick() {
        slider.current.slickNext()
    }
    function handleRightClick() {
        slider.current.slickPrev()
    }

    return (
        <div style={{ width: '100%', height:sm?350:matches?500: 650 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {/* <KeyboardArrowLeftOutlinedIcon onClick={handleLeftClick} style={{ fontSize:sm?20:matches?30: 40, position: 'absolute', left:matches?'5%': '5%', top:sm?'50%':matches?'55%': '80%', zIndex: 1, color: 'darkslategrey' }} /> */}
                    <Slider ref={slider} {...settings}>
                        {playImages()}
                    </Slider>
                    {/* <KeyboardArrowRightOutlinedIcon onClick={handleRightClick} style={{ fontSize:sm?20:matches?30: 40, position: 'absolute', right:sm?'5%' :matches?'8%': '57%', top:sm?'50%' :matches?'55%': '80%', zIndex: 1, color: 'darkslategrey' }} /> */}
                </Grid>
                <Grid item xs={12}>
                    {data.discription}
                </Grid>
                  

            </Grid>

        </div >
    )
}
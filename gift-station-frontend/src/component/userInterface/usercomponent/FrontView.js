
import { Grid, Paper } from "@mui/material";
import { useStyles } from "./FrontviewCSS";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getData, ServerURL } from "../../services/ServerServices";
import { useEffect, useState } from "react";
import Trending from "./Trending";
import { useNavigate } from "react-router-dom";
import Deals from "./Deals";
import ExploreCategory from "./ExploreCategory";



export default function () {
  var classes = useStyles()
  var navigate = useNavigate()
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [trendingProduct, setTrendingProduct] = useState([])

  const [subcategoryId, setSubCategoryId] = useState(trendingProduct.subcategory)




  const fetchTrendingProducts = async () => {
    var result = await getData('userInterface/fetch_ourspecial_data')
    setTrendingProduct(result.data)
    // setSubCategoryData(result.data)

  }
  useEffect(function () {
    fetchTrendingProducts()
  }, [])

  const handlSubcategory = () => {
    navigate("/products",
      { state: { subcategoryid: subcategoryId } })
    // console.log(subcategoryId)
  }

  const fillTrendingProduct = () => {
    return trendingProduct.map((item) => {
      return (
        <Grid item xs={matches ? 4 : matches_sm ? 6 : 3}>
          <div
            onMouseEnter={() => setSubCategoryId(item.subcategoryid)}
            onClick={handlSubcategory}
          >

            <div style={{ width: '100%' }} 
              className={classes.imageDivLeft}
            >
              <img src={`${ServerURL}/images/${item.subcategoryicon}`}
                className={classes.imageLeft} />
              <div
                style={{
                  fontSize: matches_sm ? 14 : matches ? 18 : 20, marginRight: matches_sm ? '20%' : 10, fontWeight: 500, marginTop: 20,
                  fontFamily: 'Poppins', textAlign: 'center',

                  justifyContent: 'center',
                  '&:hover': {
                    color: 'linear-gradient(90deg, rgba(196,15,15,0.6250875350140056) 0%, rgba(180,6,6,0.6250875350140056) 28%, rgba(230,16,54,0.6250875350140056) 33%, rgba(195,55,41,0.7875525210084033) 40%, rgba(194,12,12,0.5046393557422969) 47%, rgba(223,48,28,0.6558998599439776) 59%, rgba(222,23,61,0.6979166666666667) 66%, rgba(163,4,4,0.6250875350140056) 70%, rgba(163,4,4,0.711922268907563) 83%)',

                  }

                }}
              >
                {item.subcategoryname}
              </div>
            </div>

          </div>
        </Grid>
      )
    })

  }


  return (
    <div>
      <div style={{
        width: '100%', height: !matches ? 200 : 100,
        display: 'flex', flexDirection: 'row',
        marginTop: matches_sm ? 30 : matches ? 50 : ''
      }}>
        <div className={classes.svg}
          style={{ width: matches_sm ? '40%' : matches ? '40%' : '60%' }} >
          <img src="/assets/gift-set.svg"
            style={{ width: matches_sm ? '70%' : matches ? '40%' : '35%' }}
          />
        </div>
        <div className={classes.text} style={{ fontSize: matches ? 22 : 36 }}>
          Unique  Gifts Online
          <div style={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: matches ? 12 : 22 }}>
            Curated to make every special moment a celebration
          </div>
        </div>
      </div>
      <Grid container spacing={2}>
        {fillTrendingProduct()}
      </Grid>
      <div style={{ width: '100%', marginTop: 50 }}>
        <img src="/assets/slider.webp"
          style={{ width: '100%', height: '90%' }} />
      </div>
      <div style={{ width: '94%', marginLeft: '3%', }}>
        <Trending />
      </div>
      
     
      <div>
        <img src="/product/rakhi_celebration.webp"
          style={{ width: 1400, height:matches?150: 265, marginTop: 50, marginLeft: -39 }} />
        {/* {maincontainer()} */}
        <div style={{ fontFamily: 'Poppins', fontSize: 28, marginLeft: '0%', marginTop: '5%' }}>
          Our Deals Products
        </div>
        <Deals />
        {/* {Budgetbuys()} */}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '5%', width: '100%' }}>
        <div style={{ width: '40%', marginRight: '5%', marginLeft: '5%' }}>
          <img src="/product/sister.webp" style={{ width: '112%', height:matches?150: 300 }} />
        </div>
        <div style={{ width: '40%' }}>
          <img src="/product/brother.webp" style={{ width: '112%', height:matches?150: 300, marginLeft: '-3px' }} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '5%', width: '100%' }}>
        {/* <div style={{ width: '100%', marginRight: '2%', marginLeft: '5%' }}>
          <img src="/product/front View Banner.webp" style={{ width: '100%', height:matches?150: 300 }} />
        </div> */}
        {/* <div style={{width:'47%'}}>
          <img src="/product/cake slider/Hand_Lamp_Static.webp" style={{width:'100%', height:300}} />
        </div> */}
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div style={{
            display: 'flex',
            fontFamily: 'Poppins',
            fontWeight: 800,
            fontSize: 25,
            justifyContent: 'left',
            alignItems: 'center',
            marginTop: 40,
            marginBottom: 20,
            marginLeft: 40
          }}>
            Gifts By Region
          </div>
        </Grid>


      </Grid>


    </div>
  )
}
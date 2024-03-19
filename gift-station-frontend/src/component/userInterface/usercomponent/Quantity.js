import { Button, Grid, Paper } from "@mui/material"
import { useStyles } from "./ProductCSS"
import { ServerURL } from "../../services/ServerServices"
import { useDispatch } from "react-redux";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function Quantity(props) {

    var classes = useStyles()
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
   var dispatch =useDispatch()

    var data = props.data
    var pdata = props.pdata
    // console.log("PDATA:", pdata)

    const handleDispatch=(item)=>{
        item['qty']=1
     dispatch({type:'ADD_CART', payload:[item.productlistid, item]})
      props.setRefresh(!props.refresh)
    }

   
//     const Add=()=>{
//       <> 
//        {/* <div style={{ width: '100%', marginTop: 50 }}>
//         <Button variant="contained" fullWidth
//             className={classes.buttonCss}
//             onClick={()=>handleDispatch(data)}
             
//         >Add to Cart</Button>
//     </div> */}
//     <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
//         <div className={classes.heading2}>
//             Share :
//             <div style={{ width: '22vh', display: 'flex', justifyContent: 'space-evenly' }}>
//                 <FacebookIcon />
//                 <TwitterIcon />
//                 <PinterestIcon />
//                 <LinkedInIcon />
//                 <EmailIcon />
//             </div>
//         </div>
//         <div className={classes.heading3}>
//             <QuestionMarkIcon />
//             Ask A Question
//         </div>
//     </div>
// </>
//     }

    function product() {
        return (
            <>
                <div>
                    {pdata.productname}
                <span className={classes.offer}
                   style={{marginLeft:10, }}
                >

                       ({pdata.weight} {pdata.pricetype})
                </span>
                <div className={classes.offer}>
                            <s> &#8377; {pdata.price}</s>
                        </div>
                    <h3>
                        <span style={{ marginLeft:sm?0: 10 }}>
                            &#8377;  {pdata.offerprice}
                            <sup>
                                <span style={{ background: '#93C55B', fontFamily: 'Poppins', fontSize: 18, fontWeight: 400, borderRadius: 5, marginLeft: 10, color: '#680747', width: 80, marginBottom: 5 }}>
                                    {parseInt((pdata.price - pdata.offerprice) / pdata.price * 100)}% OFF
                                </span>
                            </sup>
                        </span>

                       

                    </h3>
                </div>
            </>
        )

    }


    function pricedata() {
        return data.map((item) => {
            return (
                <>
                    <Paper elevation={5} 
                    style={{ width:md?'45%': '40%', height: '40%', marginBottom: 10,  borderRadius: 10, justifyContent: 'space-between', padding: 2, marginRight: 20, border:"solid 1px #ec729c" }}>

                        <div >
                            <img src={`${ServerURL}/images/${item.picture}`}
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', padding:5}} >


                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>


                                <div className={classes.offer}
                                   style={{fontSize:md?12:14}}
                                >
                                    {item.weight} {item.pricetype}
                                </div>

                                <div >
                                    <div className={classes.price}
                                      style={{fontSize:md?10:14, marginRight:'1%'}}
                                    >
                                        &#8377;{item.offerprice}
                                    </div>
                                </div>
                               

                            </div>

                            <div >
                                <Button variant='contained'
                                onClick={()=>handleDispatch(item)}
                                    // className={classes.button2Css}
                                    style={{ background: "#f76b8a" , 
                                    width:5, height:30, marginLeft:20 }}

                                >+</Button>
                            </div>
                        </div>
                    </Paper>
                </>
            )
        })
    }

    
    return (
        <div style={{display:'flex', alignItems:'center',}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h3>
                        <div  >
                        {product()}
                        </div>
                    </h3>
                </Grid>
                   {!sm?<> 
                <Grid item xs={12}>
                   <div>
                    <h3>Select Variant</h3>

                    </div>
                </Grid>
                <Grid item xs={12}>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>

                        {pricedata()}
                    </div>
                </Grid>
                  </>  :<></>}

            </Grid>
        </div>
    )
}
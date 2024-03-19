import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { IconButton, Typography } from '@mui/material';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import Header from './Header';
import { useStyles } from './FrontviewCSS';
import ShowProduct from './ShowProduct';
import Trending from './Trending';



export default function CakeProduct(){

    var classes= useStyles()

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const matches_small = useMediaQuery(theme.breakpoints.down('sm'));

    const Budgetbuys=()=>{
        return(
          <>
          <div style={{display:'flex',justifyContent:'left',
           fontFamily:'Poppins', fontWeight:700, fontSize:24, margin:50, 
          }}>
            Budget Buys
          </div>
          <div>
            <img src='/product/cakes_under_695_igp_bars.webp'/>
            <img src='/product/cakes_under_995_igp_bars.webp'
             style={{marginRight:20, marginLeft:50}}/>
            <img src='/product/cakes_under_1500_igp_bars.webp'
            />
          </div>
          </>
        )
      }

    const maincontainer = () => {
        return (<>
    <div style={{display:'flex',justifyContent:'left',
           fontFamily:'Poppins', fontWeight:700, fontSize:24, margin:50, 
          }}>  
          Celebrate Milestones
          </div>
    <div style={{ display:'flex' ,width: '100%', marginTop:50 , justifyContent:'center'}}>
              <img src="/product/yearly celebrate/half_yearly_milestone.webp"
              className={classes.milestone}
              />
               <img src="/product/yearly celebrate/first_year_milestone.webp"
             className={classes.milestone}
              />
               <img src="/product/yearly celebrate/25_year_milestone.webp"
              className={classes.milestone}
              />
              <img src="/product/yearly celebrate/30_year_milestone.webp"
              className={classes.milestone}
              />
              <img src="/product/yearly celebrate/50_year_milestone.webp"
              className={classes.milestone}
              />
               <img src="/product/yearly celebrate/75_year_milestone.webp"
              className={classes.milestone}
              />
            </div>    
              
        </>
        )
      }  

      const appbar=()=>{
        return(
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position='fixed'
                style={{
                    display: 'flex', justifyContent: 'space-evenly',
                    background: ' rgb(196,15,15)',
                    background: 'linear-gradient(90deg, rgba(196,15,15,0.6250875350140056) 0%, rgba(180,6,6,0.6250875350140056) 28%, rgba(230,16,54,0.6250875350140056) 33%, rgba(195,55,41,0.7875525210084033) 40%, rgba(194,12,12,0.5046393557422969) 47%, rgba(223,48,28,0.6558998599439776) 59%, rgba(222,23,61,0.6979166666666667) 66%, rgba(163,4,4,0.6250875350140056) 70%, rgba(163,4,4,0.711922268907563) 83%)',
                    height: 45
                }}>
                <Toolbar>
                    {!matches ? <>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            style={{ marginLeft: '4%' }}
                        >
                            <LocationOnIcon />
                        </IconButton>
                        <span style={{ fontFamily: 'Poppins', fontSize: 16 }}> Gwalior</span>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-evenly' }}>


                            < div style={{
                                display: 'flex',
                                alignItems: 'center',
                                alignSelf: 'center',
                                justifyContent: 'center',
                                fontFamily: 'Poppins',
                                fontSize: 16,
                                marginRight: 15
                            }}>
                                <CardGiftcardIcon />
                                <span style={{ marginLeft: 5, fontFamily: 'Poppins', fontWeight: 400, fontSize: 16 }}>Gift_E_Bazar</span>
                            </div>
                        </Typography>

                        <div style={{ display: 'flex', marginRight: 15, fontFamily: 'Poppins', fontSize: 16 }}>Track Order</div>


                    </> : <>
                        <div style={{ display: 'flex', justifyItems: 'center', marginLeft: '5%' }}>
                        </div>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-evenly' }}>


                            < div style={{
                                display: 'flex',
                                alignItems: 'center',
                                alignSelf: 'center',
                                justifyContent: 'center',
                                fontFamily: 'Poppins',
                                fontSize: 16,
                                marginRight: '5%'
                            }}>
                                <CardGiftcardIcon />
                                <span style={{ marginLeft: 5, fontFamily: 'Poppins', fontWeight: 400, fontSize: 16 }}>Gift_Station</span>
                            </div>
                        </Typography>

                    </>}
                </Toolbar>
            </AppBar>
        </Box>

        )
      }
    

    return(
        <div>
            <div>
                {appbar()}
                     </div>

           {/* <Header/> */}
        <div style={{width:'100%', fontFamily:'Poppins', fontSize:22, fontWeight:500,
            
          }}>
                </div>
            <div style={{display:'flex', justifyContent:'center'}}>
            <img src='/product/banner.jpg' 
              style={{width:'90%',marginTop:'5%' }}
            />

            </div>
            <div>
                {maincontainer()}
            </div>
            <div style={{ display:'flex',justifyContent:'left',
           fontFamily:'Poppins', fontWeight:700, fontSize:24, margin:50,}} >
                Our BlockBusters
               
            </div>
            {/* <div>
                {Budgetbuys()}
            </div> */}


        </div>
    )
}
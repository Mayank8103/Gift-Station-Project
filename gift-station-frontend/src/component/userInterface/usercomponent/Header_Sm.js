import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Badge, IconButton, Tooltip } from '@mui/material';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import SearchIcon from '@mui/icons-material/Search';
import Person3Icon from '@mui/icons-material/Person3';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import SegmentOutlinedIcon from '@mui/icons-material/SegmentOutlined';
import { useStyles } from './HeaderCSS';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBarDrawer from '../MenuBarDrawer';
import { useState } from 'react';
import WishlistDrawer from './WishlistDrawer';


export default function Header() {
const [opens, setOpens]=useState(false)
const [wishOpen,setWishOpen ] = useState(false)

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    var classes = useStyles()
    var navigate = useNavigate()

    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleOpenDrawer=()=>{
        // alert(opens)
        setOpens(true)
    }
    const handleWishOpen=()=>{
        
        setWishOpen(true)
    }
    



    return (<>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='fixed'
                style={{
                    display: 'flex', justifyContent: 'space-evenly',
                    background: '#c44569',
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
             
        <div style={{ display: 'flex', flexDirection: 'row' , marginTop:!matches?'3%':'5%'}}>
        {!matches?<>
            <div >
                <img src='/assets/mygift.avif' style={{ width: 300, marginLeft: 70, marginTop: 16 }} />
            </div>

            <div className={classes.searchbar}>
                <input
                    type="text"
                    placeholder='Search Products'
                    className={classes.input}
                /> 
                <SearchIcon style={{ marginLeft: "auto", marginRight: 10, fontSize: 32, borderLeft: "solid 2px #000" }} />
            </div>
                </>:<>
                <MenuIcon  style={{marginLeft:'auto', marginTop:'3%' }}
                   onClick={handleOpenDrawer}
                />
                <SearchIcon style={{ marginLeft: "2%", marginRight:'5%',marginTop:'3%' ,fontSize: 24 }} />
                <div >
                <img src='/assets/mygift.avif' style={{ width: 200, marginLeft: 70, marginTop: 16 }} />
            </div>
                </>}
                
            <div style={{ display: 'flex', width: 380, flexDirection: 'row', justifyContent: "right" }}>
                <Tooltip title="Login">
                    <Person3Icon style={{ display: 'flex', marginTop:!matches?'12%':'7%', fontSize:!matches?32:24 }} onClick={handleClick} />
                </Tooltip>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => navigate('/Login')} >Login</MenuItem>
                    <MenuItem onClick={() => navigate('/Signup')}>SignUp</MenuItem>
                    <MenuItem onClick={handleClose}>WishList</MenuItem>
                </Menu>


                <Badge badgeContent={2} color="warning" style={{ display: 'flex', marginTop:!matches?'12%':'7%', fontSize:!matches?32:24}} >
                    <Tooltip title="cart">

                        <LocalMallOutlinedIcon style={{ display: 'flex', marginLeft: 20, fontSize:!matches?30:22 }} 
                        onClick={handleWishOpen}
                        />
                    </Tooltip>
                </Badge>
                <Tooltip title="setting">
                    <SegmentOutlinedIcon style={{ display: 'flex', marginTop:!matches?'12%':'7%', marginLeft: 20, fontSize:!matches?32:24, marginRight: 50 }} />
                </Tooltip>
            </div>
        </div>
        {!matches?
        <div className={classes.linebar}>
            <span className={classes.text}>Birthday Gifts</span>
            <span className={classes.text}>Anniversary Gifts</span>
            <span className={classes.text}>Gift Baskets</span>
            <span className={classes.text}>Personalizes Gifts</span>
            <span className={classes.text}>Occasion's</span>
            <span className={classes.text}>Cake Delivery</span>
            <span className={classes.text}>Flower's</span>
            <span className={classes.text}>Gift Ideas</span>
            <span className={classes.text}>Corporate Gifts</span>
        </div>
        :<></>}
          <MenuBarDrawer opens={opens} setOpens={setOpens}  />
          <WishlistDrawer wishOpen={wishOpen} setWishOpen={setWishOpen} />

    </>
    );
}
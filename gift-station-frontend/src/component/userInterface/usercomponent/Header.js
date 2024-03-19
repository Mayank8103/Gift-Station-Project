
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Badge, IconButton, Tooltip } from '@mui/material';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import SearchIcon from '@mui/icons-material/Search';
import Person3Icon from '@mui/icons-material/Person3';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import SegmentOutlinedIcon from '@mui/icons-material/SegmentOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useStyles } from './HeaderCSS';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBarDrawer from '../MenuBarDrawer';
import WishlistDrawer from './WishlistDrawer';
import { useSelector } from 'react-redux';
import { getData } from '../../services/ServerServices';
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';


export default function Header() {
    const [opens, setOpens] = useState(false)
    const [wishOpen, setWishOpen] = useState(false)
    const [category, setCategory] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [draweropens, setDrawerOpens]=useState(false)

    const pageRefresh=()=>{
        setRefresh(!refresh)
    }


    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const matches_small = useMediaQuery(theme.breakpoints.down('sm'));

    var classes = useStyles()
    var navigate = useNavigate()
    var products = useSelector((state) => state.cart)
    var totalProducts = Object.keys(products)
    var productList = Object.values(products)
    // console.log("TOTAL PRODUCTS:",totalProducts)

    const [anchorEl, setAnchorEl] = useState(null);


    const open = Boolean(anchorEl);

    function handleClick(event) {
        navigate('/Login')
        // setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };


    // open Menubar >>>>>>>>>>
    const handleOpenDrawer = () => {
        // alert(opens)
        setOpens(true)
    }

     // OPen cart >>>>>>>>>
    const handleWishOpen = () => {

        setWishOpen(true)
        { catData() }
    }

    const fetchCategory = async () => {
        var result = await getData("userInterface/fetch_category_data",)
        setCategory(result.data)
    }
    useEffect(function () {

        fetchCategory()
    }, [])

    const handleCategory = (item) => {
        // setCategoryId(categoryId)
        navigate("/subcatedisplay", { state: { categoryid: item.categoryid } })
        setRefresh(!refresh)
    }

    const catData = () => {
        return (
            category.map((item) => {
                return (<>
                    <div className={classes.text} onClick={() => handleCategory(item)}>
                        {item.categoryname}
                    </div>
                </>
                )
            })

        )
    }

    return (<>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='fixed'
                style={{
                    display: 'flex', justifyContent: 'space-evenly',
                    background: "rgb(252,70,107)",
                    background: "radial-gradient(circle, rgba(252,70,107,0.6547870421677493) 0%, rgba(239,117,51,0.6828769298081987) 0%, rgba(207,7,44,0.6547870421677493) 89%)",
                    height: 50,
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
                                <span style={{ marginLeft: 5, fontFamily: 'Poppins', fontWeight: 400, fontSize: 16 }}>
                                    Gift_Station
                                    </span>
                            </div>
                        </Typography>

                        <div style={{ display: 'flex', marginRight: 15, fontFamily: 'Poppins', fontSize: 16 }}>
                         <EmailOutlinedIcon/>   support@giftstation.in</div>


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

        <div style={{ display: 'flex', flexDirection: 'row', marginTop: !matches ? '3%' : '5%' }}>
            {!matches ? <>
                <div ><a href='/home'>

                    <img src='/assets/Gift-Station-logos_transparent.png' style={{ width: 240, marginLeft: 50, marginTop:22 , marginBottom: -25, height:53 }}

                    />
                </a>
                </div>

                <div className={classes.searchbar}>
                    <input
                        type="text"
                        placeholder='Search Products'
                        className={classes.input}
                    />
                    <SearchIcon style={{ marginLeft: "auto", marginRight: 10, fontSize: 32, borderLeft: "solid 2px #000" }} />
                </div>
            </> : <>
                <MenuIcon style={{ marginLeft: matches_small ? 25 : matches ? 35 : '', marginTop: matches_small ? 45 : 30 }}
                    onClick={handleOpenDrawer}

                />
                <SearchIcon style={{ marginLeft: "2%", marginRight: '5%', marginTop: matches_small ? 45 : 30, fontSize: 24 }} />
                <div >
                    <a href='/home'>
                        <img src='/assets/mygift.avif' style={{ width: 160, marginLeft: matches_small ? 15 : matches ? '80%' : '', marginTop: matches_small ? 35 : matches ? 20 : 45, marginRight: 0 }} />
                    </a></div>
            </>}

            <div style={{ display: 'flex', width: 380, flexDirection: 'row', justifyContent: "right" }}>
                <Tooltip title="Login">
                    <Person3Icon 
                    style={{display:'flex',
                     marginTop: matches_small?45:matches?30:46,
                    marginLeft:matches?'90%':0,
                     fontSize:!matches?24: 24 }} 
                    
                    onClick={handleClick} />
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


                <Badge badgeContent={totalProducts.length} color="warning" 
                style={{ display: 'flex', 
                          marginTop: matches_small? 45:matches?26 : 45,
                           fontSize:!matches?10: 24 }} >
                    <Tooltip title="cart">

                        <LocalMallOutlinedIcon 
                        style={{ display: 'flex', 
                        marginLeft: matches_small?5:10,
                         fontSize: !matches ? 22 : 22 }}
                            onClick={handleWishOpen}
                        />
                    </Tooltip>
                </Badge>
                <Tooltip title="setting">
                    <SegmentOutlinedIcon 
                    style={{display:'flex',
                    marginTop:matches_small?45:matches?30:45,
                    marginLeft:matches_small ? 8 :10, 
                    fontSize: !matches ?22 :22,
                    marginRight:matches_small?0:matches?0:50 }} />
                </Tooltip>
            </div>
        </div>
        {!matches ?

            <div className={classes.linebar}>
                {catData()}

            </div>
            : <></>}
        <MenuBarDrawer opens={opens} setOpens={setOpens} />
        <WishlistDrawer 
        wishOpen={wishOpen} setWishOpen={setWishOpen} 
        products={products} pageRefresh={pageRefresh} />
        {/* <Dropbox draweropens={draweropens} setDrawerOpens={setDrawerOpens} /> */}
    </>
    );
}
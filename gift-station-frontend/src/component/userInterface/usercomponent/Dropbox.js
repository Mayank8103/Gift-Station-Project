import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useStyles } from './DropboxCSS';
import { ServerURL } from '../../services/ServerServices';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


var img = [
  {
    id: 1,
    name: 'Red Teddy Bear',
    price: '1200',
    picturename: 'teddy8.png'
  },
  {
    id: 2,
    name: 'Candles set gift',
    price: '3499',
    picturename: 'candles-set-gift.png'
  },
  {
    id: 3,
    name: 'Cups',
    price: '2599',
    picturename: 'cups.webp'
  },
  {
    id: 4,
    name: 'Happy Basket dry fruits',
    price: '2999',
    picturename: 'happy-basket-dry-fruits.png',

  },
  {
    id: 5,
    name: 'Tommy-Watch',
    price: '10999',
    picturename: "tommy-watch.png"
  },
  {
    id: 6,
    name: 'Giftbasket Candles',
    price: '999',
    picturename: "women-gift-basket-candles.png"
  },
  {
    id: 7,
    name: 'Light pink roses',
    price: '12999',
    picturename: 'light-pink-roses.png'
  },
  {
    id: 8,
    name: 'Gift basket women',
    price: '11999',
    picturename: 'gift-basket-women.png'
  },
  {
    id: 9,
    name: 'Theodore Watch',
    price: '12999',
    picturename: 'Theodore Watch.png'
  }
]


export default function Dropbox(props) {

  var navigate = useNavigate()
  var user = useSelector((state) => state.user)
  var value = Object.values(user)
  var userkey = Object.keys(user)

  var classes = useStyles()
  var dispatch = useDispatch()
  const [dropopen, seDropOpen]=useState(false)
  const [refresh,setRefresh]=useState(false)
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClick=async(item)=>{
     item['qty']=1
     dispatch({type:'ADD_CART', payload:[item.id, item]})
      props.setRefresh(!props.refresh)
  }
  function image() {
    return (img.map((item) => {
      return (
        <div style={{
          display: 'flex',
          width: fullScreen ? 170 : smallScreen ? 120 : 230,
          height: fullScreen ? 400 : smallScreen ? 350 : 450,
          background: '#f2f2f2',
          // alignItems: 'center',
          flexDirection: 'column',marginBottom: '5%',
          marginRight: '2%',marginLeft: '2%'
        }}>
          {/* <Paper style={{ display: 'flex', background: '#f2f2f2' }}> */}
          <div style={{ padding: '10%' }}>
            <img src={`${ServerURL}/images/${item.picturename}`}
              style={{
                width: fullScreen ? 130 : smallScreen ? 90 : 170,
                margin: '1%',
                height: fullScreen ? 150 : 180
              }}
            />
          </div>
          <div className={classes.text} style={{
            fontFamily: 'Poppins',
            fontWeight: 400,
            fontSize: !fullScreen ? 18 : 16,
          }}>
            {item.name}
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-evenly', marginTop: '20%'
          }}>
            <div style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 20 }}>
              &#8377; {item.price}
            </div>
            <Button onClick={()=>handleClick(item)} startIcon={<AddIcon />} variant='outlined'
              sx={{
                backgroundColor: "#b2bec3",
                color: "#000", padding: 1,
              }}>
              Add</Button>
          </div>
          {/* </Paper> */}
        </div>
      )
    })
    )
  }

  const [open, setOpen] = useState(false);


  useEffect( function(){

    setOpen(props.draweropens)
  },[props.draweropens])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // (navigate('/viewcart'))
    {
          userkey.length != 0 ? (navigate('/viewcart'))
          :
          Swal.fire({
              title: 'You dont have log in?',
              text: "To see cart login first",
              showDenyButton: false,
              showCancelButton: true,
              confirmButtonText: 'Log in',
              denyButtonText: `Don't save`,
          }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                  navigate('/login')
              } else if (result.isDenied) {
                  Swal.fire('Changes are not saved', '', 'info')
              }
          })
      }

  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
      <Dialog

        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="responsive-dialog-title" >
          {/* <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}> */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CloseIcon onClick={handleClose} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Poppins', fontSize: '1.2em', width: '100%', height: '10vh' }}>

            All Time Top Sellers
          </div>
          {/* </div> */}
        </DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            {image()}
          </div>
        </DialogContent>
        <DialogActions>
          <Button fullWidth onClick={handleClose}
            sx={{
              backgroundColor: "#b2bec3",
              color: "#000",
               padding: 1,
                width: '100%',
                 height: '8vh', 
                 fontFamily: 'Poppins', 
                 fontWeight: 500, 
                 fontSize: '1.4em', textTransform: 'capitalize'
            }}>
            No, thanks
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export default function Price(props) {

  var user = useSelector((state) => state.user)
  // var value = Object.values(user)
  var userkey = Object.keys(user)

  var navigate = useNavigate()
  const handleNavigate = () => {

    props.setState(false)
    { userkey.length != 0 ? (navigate('/viewcart'))
    :  
  //   props.setOpen(false)
          
    Swal.fire
        ({
         
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
  }
  const [price, setPrice] = useState('')

  const prices = () => {

    let total = props.data.reduce((a, b) => {
      return a + b.offerprice * b.qty
    }, 0)

    setPrice(total)
    // props.pageRefresh()

  }

  useEffect(function () {
    prices()
    // props.pageRefresh()
  }, [props])

  return (
    <>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'end',
        bottom: 5,
        marginTop: '1%',
        marginLeft: '5%',
        marginRight: '5%'
        // bottom:'5%'
      }}>
        {price != 0 ? <>
          <h3> Total: </h3>
          <h3 style={{ float: 'right' }}>Rs.{price} </h3></> : ""}


      </div>
      {price != 0 ? <>
        <Button variant='contained' onClick={() => handleNavigate()}
          style={{
            background: "#f76b8a", height: 50, width: '70%', marginLeft: '20%',
            marginTop: '2%', borderRadius: 5
          }}
        >
          Proceed
        </Button> </> : <Button variant='text'
          style={{
            height: 50, width: '60%', marginLeft: '20%',
            marginTop: '2%', borderRadius: 10, color: "#f76b8a"
          }}
        >
        Cart is Empty
      </Button>}
    </>



  )
}
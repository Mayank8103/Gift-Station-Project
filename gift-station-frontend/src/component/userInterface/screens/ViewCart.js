import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import WishlistDrawer from "../usercomponent/WishlistDrawer"
import StepperFile from "../usercomponent/StepperFile"
import { AppBar, Button, Grid } from "@mui/material"
import Information from "../usercomponent/Information"
import Cartdata from "../usercomponent/CartData"
import GiftMessage from "../usercomponent/GiftMessage"
import Footer from "../usercomponent/Footer";

export default function ViewCart(){
     const [refresh,setRefresh]=useState(false)
     const dispatch=useDispatch()
     const products= useSelector((state)=> state.cart)
    const productlist = Object.values(products)
    const keys = Object.keys(products)

    const PageRefresh=()=>{
        setRefresh(!refresh)
    }

    

    const handleDelete=()=>{
        keys.forEach((key)=>{

            dispatch({ type:"DELETE_CART", payload:[]})
        })
    }

    return(

        <>
              <div style={{display:'flex', 
         justifyContent:'center',
         width:'100%'}}>
         <AppBar position='fixed' 
         sx={{background:'#fff',
         }}>
         <StepperFile/>
         </AppBar>
         </div>
         <div style={{width:'100%', display:'flex', justifyContent:'center',
         marginTop:'10%',fontSize:16}}>
           
           <b> Your Cart </b>
         </div>
        <Grid container spacing={2}>

         <Grid item xs={7}>
         <div style={{width:'100%', height:0}}>
         </div>
         
          <Cartdata products={productlist} pageRefresh={PageRefresh} />
         </Grid>
         <Grid item xs={4}>
         <div style={{width:'100%', height:0}}>
         </div>
            <GiftMessage/>     
         </Grid>
        </Grid>
        <div>
            <Footer/>
        </div>
        </>
    )
}
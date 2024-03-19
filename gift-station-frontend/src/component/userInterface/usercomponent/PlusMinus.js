import { Button, ButtonGroup } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";


export default function PlusMinus(props){
     
   var product = props.products
    const [value,setvalue]=useState(product.qty)

    var dispatch=useDispatch()


    const handlePlus=()=>{
 
        var v = value+1
        product['qty']=v
        dispatch({type:'ADD_CART',payload:[product.productlistid,product]})
        setvalue(v)
        props.pageRefresh()

    }

    const handleMinus=()=>{
        var v = value-1
         
        if(v==0)
        {
         dispatch({type:'DELETE_CART', payload:[product.productlistid]})
         props.pageRefresh()
        }
        if(v>0)
        {
            product['qty']=v
            dispatch({type:'ADD_CART',payload:[product.productlistid,product]})
            setvalue(v)
            props.pageRefresh()
        }


    }

    return(
        <>
         <div style={{border:'solid 1px ', 
                       display:'flex', 
                       justifyContent:'center',
                       width:100,
                       fontSize:14,marginLeft:40,marginTop:5
                       }}>
            <Button variant='text' sx={{outline:'none'}} onClick={handlePlus} >
                +
            </Button>
          <div style={{paddingTop:8}}> {value} </div>  
            <Button variant='text' sx={{outline:'none'}} color="error" onClick={handleMinus} >
                -
            </Button>
            
         </div>
        
        </>
    )
}
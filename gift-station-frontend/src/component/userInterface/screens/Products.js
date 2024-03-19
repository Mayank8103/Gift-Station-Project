import { useState } from "react";
import CakeProduct from "../usercomponent/CakeProduct";
import Footer from "../usercomponent/Footer";
import Header from "../usercomponent/Header";
import ShowProduct from "../usercomponent/ShowProduct";
import ProductDisplay from "../usercomponent/ProductDisplay";
import { useLocation } from "react-router-dom";

export default function Products(props){

    // var location =useLocation()
    // var Product = JSON.parse(location.state.data)
    // console.log("Product:", Product)
       
    const [refresh, setRefresh]=useState(false)

    return(
        <div>
            <Header/>
            {/* <CakeProduct/> */}
            <div style={{width:'100%', display:'flex', justifyContent:'center',
                     fontSize:40,
                     background: '-webkit-linear-gradient(rgb(188, 12, 241), rgb(212, 4, 4))',
                     webkitBackgroundClip: "text",
                     WebkitTextFillColor: "transparent", 
        }}>  Our Products

            </div>
            <div>
                <ProductDisplay refresh={refresh} setRefresh={setRefresh} />
            </div>
            <div style={{width:'100%', height:200}}></div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}
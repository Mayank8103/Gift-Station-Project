import { useState } from "react";
import Footer from "../usercomponent/Footer";
import Header from "../usercomponent/Header";
import ShowProduct from "../usercomponent/ShowProduct";


export default function AllProduct(props){

    // var location =useLocation()
    // var AllProductdata = JSON.parse(location.state.data)
    //  alert("All Product", AllProductdata)

    const [refresh, setRefresh]=useState(false)

    return(
        <div>
            <Header/>
            {/* <CakeProduct/> */}
            <div>
                <ShowProduct refresh={refresh} setRefresh={setRefresh} />
            </div>
            <div style={{width:'100%', height:200}}></div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}
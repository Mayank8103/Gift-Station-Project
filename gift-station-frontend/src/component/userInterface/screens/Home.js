import { useState } from "react";
import BottomSlider from "../usercomponent/BottomSlider";
import Dropbox from "../usercomponent/Dropbox";
import Footer from "../usercomponent/Footer";
import FrontView from "../usercomponent/FrontView";
import Header from "../usercomponent/Header";
import MainSlider from "../usercomponent/MainSlider";

export default function Home(props){
    const [refresh,setRefresh]= useState(false)
    
    return(
        <div style={{overflowX:'none'}}>
            <Header   />
            {/* <Dropbox  setRefresh={setRefresh} refresh={refresh}/> */}
            <div style={{width:'95%', marginLeft:'3%',marginTop:'2%'}} >
              <MainSlider/>
              
                </div> 
                <div style={{width:'94%', marginLeft:'3%', }}>
                    <FrontView/>
                </div>
               <div style={{width:'95%', marginLeft:'3%'}}>
                    <BottomSlider/>
                </div>
                <div style={{ height:50}}>
                </div>
                 {/* <div>
                    <FrontBottom/>
                </div> */}
                <div>
                    <Footer/>
                </div>
        </div>
    )
}
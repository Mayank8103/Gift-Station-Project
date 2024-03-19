
import Footer from "../usercomponent/Footer";
import Header from "../usercomponent/Header";
import MainSlider from "../usercomponent/MainSlider";
import Selectsubcat from "../usercomponent/Selectsubcat";



export default function Subcatdisplay (){
    return(
        <div>
            <Header/>
            <div style={{width:'95%', marginLeft:'3%',marginTop:'2%'}} >
              {/* <MainSlider/> */}
                  
              
                </div>
            <div>
                <Selectsubcat/>
            </div>
            <div style={{width:'100%', height:200}}></div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}
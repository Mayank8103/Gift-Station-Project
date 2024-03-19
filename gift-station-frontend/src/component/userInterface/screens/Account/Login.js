import Footer from "../../usercomponent/Footer";
import Header from "../../usercomponent/Header";
import LoginForm from "./LoginForm";

export default function Login(){
     

    return(
        <div>
            <div>
            <Header/>
            </div>
            <div style={{width:'100%'}}>
            <LoginForm/>
            </div>
            <div style={{width:'100%', height:600}}></div>
            <div>
                <Footer/>
            </div>
            
        </div>
       

    )
}
import Footer from "../../usercomponent/Footer";
import Header from "../../usercomponent/Header";
import SignUpForm from "./SignUpForm";



export default function SignUp(){
    return(
        <div>
            <Header/>
            <div>
                <SignUpForm/>
            </div>
            <div style={{width:'100%', height:600}}></div>
            <div>
                <Footer/>
            </div>
           
        </div>
    )
}
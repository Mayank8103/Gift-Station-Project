import { useStyles } from "./FrontBottomCSS"

export default function FrontBottom (){
    var classes = useStyles()
    return(
        <div style={{display:'flex', marginTop:20}}>
        <div style={{display:'flex',width:'100%', height:500, background:'#ffefef'}}>
            <div className={classes.text1}>
               To customer service of MakeMyGifts  
             
                Thank you so much for your delivery which came in good timing. 
                The surprise was well presented to reflect our  love for our mother  
        
             </div>
        </div>
        </div>
    )
}
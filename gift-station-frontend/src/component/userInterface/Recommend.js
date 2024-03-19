import { Grid, Paper } from "@mui/material";
import { useStyles } from "./usercomponent/RecommendCSS";
import { ServerURL } from "../services/ServerServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function Recommend() {
    var classes = useStyles()
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));


    var img = [
        {
            id: 1,
            name: 'Teddy Bear',
            price: '1200',
            picturename: 'teddy3.png'
        },
        {
            id: 2,
            name: 'Passport Organiser',
            price: '3499',
            picturename: 'personalized-passport-organizer.webp'
        },
        {
            id: 3,
            name: 'Cups',
            price: '2599',
            picturename: 'cups.webp'
        },
        {
            id: 4,
            name: 'Dry fruits',
            price: '2999',
            picturename: 'happy-basket-dry-fruits.png',

        },
        {
            id: 5,
            name: 'Watches',
            price: '10999',
            picturename: "tommy-watch.png"
        },
        {
            id: 6,
            name: 'Candles',
            price: '999',
            picturename: "women-gift-basket-candles.png"
        },
        {
            id: 7,
            name: 'Roses',
            price: '12999',
            picturename: 'light-pink-roses.png'
        },
        {
            id: 8,
            name: 'Gift baskets',
            price: '11999',
            picturename: 'gift-basket-women.png'
        },
        
    ]

    function image() {
        return (img.map((item) => {
            return (
                <>

                    <div className={classes.container}
                        style={{
                            width:sm?'45%':md?'45%': '23%',
                            height: '25%', marginLeft:sm?'4%':md?'4%':'1%',marginBottom:'5%'
                        }}>
                        <Paper className={classes.paper}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <img src={`${ServerURL}/images/${item.picturename}`}
                                    style={{
                                        width:md?80: 100,
                                        margin: '1%',
                                        height:md?80: 100
                                    }}
                                />
                                <div className={classes.text}
                                  style={{fontWeight:sm?600:md?600:800,
                                
                                    fontSize:sm?10:md?12:16,}}
                                >
                                    {item.name} <br />
                                   Rs. {item.price}
                                </div>
                            </div>
                        </Paper>
                    </div>

                </>
            )
        }))

    }



    return (
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            {image()}

        </div>
    )
}
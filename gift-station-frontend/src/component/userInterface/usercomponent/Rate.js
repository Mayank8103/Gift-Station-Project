import { Button } from "@mui/material"
import { useStyles } from "./ProductCSS"
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Dropbox from "./Dropbox";
import { useState } from "react";



export default function Rate(props) {

    var navigate = useNavigate()
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const [draweropens, setDrawerOpens]=useState(false)


    var user = useSelector((state) => state.user)
    var value = Object.values(user)
    var userkey = Object.keys(user)
    //    console.log("userK", userkey)

    const handleNavigate = () => {
        // (navigate('/viewcart'))
        setDrawerOpens(true)

        // {
        //     userkey.length != 0 ? (navigate('/viewcart'))
        //     :
        //     Swal.fire({
        //         title: 'You dont have log in?',
        //         text: "To see cart login first",
        //         showDenyButton: false,
        //         showCancelButton: true,
        //         confirmButtonText: 'Log in',
        //         denyButtonText: `Don't save`,
        //     }).then((result) => {
        //         /* Read more about isConfirmed, isDenied below */
        //         if (result.isConfirmed) {
        //             navigate('/login')
        //         } else if (result.isDenied) {
        //             Swal.fire('Changes are not saved', '', 'info')
        //         }
        //     })
        // }
    }


    var classes = useStyles()
    function rate_data() {

        return (
            <>

                <div style={{ marginLeft: sm ? '10%' : md ? '15%' : 0, width: sm ? '80%' : md ? '40%' : '80%', marginTop: 50, display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" fullWidth
                        className={classes.buttonCss}
                        // onClick={handleDispatch}
                        onClick={() => handleNavigate()}
                    >VIEW Cart</Button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <div className={classes.heading2}
                        style={{
                            marginLeft: sm ? 10 : 0,
                            marginRight: sm ? 10 : 40,
                            fontSize: sm ? 16 : md ? 16 : 18,
                        }}
                    >
                        Share:
                        <div style={{ fontSize: sm ? 14 :md? 18:22, width: sm ? 140 :md? '22vw':200, display: 'flex', justifyContent: 'space-evenly' }}>
                            <FacebookIcon
                                style={{ fontSize: sm ? 20 :md? 18:28 }} />
                            <TwitterIcon
                                style={{ fontSize: sm ? 20 :md? 18:28 }}
                            />
                            <PinterestIcon
                                style={{ fontSize: sm ? 20 :md? 18:28 }}
                            />
                            <LinkedInIcon
                                style={{ fontSize: sm ? 20 :md? 18:28 }}
                            />
                            <EmailIcon
                                style={{ fontSize: sm ? 20 :md? 18:28 }}
                            />
                        </div>
                    </div>
                    <div className={classes.heading3}
                        style={{ fontSize: sm ? 16 : 18, marginRight: sm ? 20 : 70 }}>
                        <QuestionMarkIcon style={{ fontSize: sm ? 16 : 18, marginTop: sm ? 2 : 0 }} />
                        Ask A Question
                    </div>
                </div>

                {/* <div style={{ width: '100%', display: 'flex', flexDirection: 'row', marginTop: 30 }}>
                    <img src="/assets/eye.png"
                        className={classes.eyeimg}
                    />
                    <div style={{
                        fontFamily: 'Poppins',
                        fontWeight: 400,
                        fontSize: 18,
                        marginLeft: 10,
                        marginTop: 7
                    }}>
                        10 PEOPLE LOOKING FOR THIS PRODUCT
                    </div>
                </div > */}

                <div>

                    <img src="/assets/discover.avif" alt="Payment"

                        style={{
                            width: sm ? 350 : '45vw',
                            // margin:5,
                            marginTop: 40,
                            marginLeft: sm ? 20 : 0,
                            marginRight: sm ? 0 : 10
                        }}
                    />
                </div>

            </>
        )
    }





    return (
        <>
            <div>

            </div>
            <div>
                {rate_data()}
            </div>
            <Dropbox draweropens={draweropens} setDrawerOpens={setDrawerOpens} />
        </>
    )
}
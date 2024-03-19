import { Grid } from "@mui/material";
import { useStyles } from "./ProductCSS";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function Confidence() {

    var classes = useStyles()
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));




    return (
        <>
            <Grid item xs={12}>
                <div className={classes.heading}
                    style={{
                        display: 'flex', justifyContent: 'center',
                        fontWeight: 600,
                        fontSize: sm ? 16 : md ? 18 : 24,
                    }}
                >
                    Gift-Station Shop with Confidence
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    flexDirection: 'row'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '33%'
                    }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <img src="/assets/bus2.png"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    width: sm ? 50: md?70 : '10vw',
                                    height: sm ? 50 :md?100 : '20vh',
                                    marginTop: sm ? 10 :md?10: 40
                                }}
                            />
                        </div>
                        <div className={classes.footertxt}
                            style={{
                                fontWeight: 550,
                                fontSize: sm ? 10 :md?18 : 24,
                            }}
                        >
                            Timely Deliveries
                        </div >
                        <div className={classes.smallfont}
                            style={{ fontSize: sm ? 6 :md?14 : 18 }}
                        >
                            Never miss the occasion again with Gift-Station  delivery guarantee for cakes  & flowers.
                        </div>
                    </div>
                    <div style={{ width: '30%' }}>
                        <div style={{ display: 'flex', 
                        justifyContent: 'center' }}>
                            <img src="/assets/tick.jpg"
                                style={{ display: 'flex', 
                                justifyContent: 'center',
                                 width: sm ? 30:md?40 : '5vw', 
                                 height: sm ? 30:md?40 : '8vh', 
                                 marginTop: sm ? 25 :md?40 : 70 }}
                            />
                        </div>
                        <div className={classes.footertxt2}
                            style={{
                                fontWeight: 550,
                                fontSize: sm ? 10 :md?18: 24,
                                marginTop: sm ? 10:md?30 : 50,
                            }}
                        >
                            Quality Products
                        </div>
                        <div className={classes.smallfont}

                            style={{ fontSize: sm ? 6 :md?14 : 18 }}>
                            Quality into our products or services that speaks for itself.

                        </div>

                    </div>
                    <div style={{ width: '35%' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }} >
                            <img src="/assets/payment.png"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    width: sm ? 50 :md?70 : '5vw',
                                    height: sm ? 50:md?70 : '10vh',
                                    marginTop: sm ? 15:md?30 : 60
                                }}
                            />
                        </div>
                        <div className={classes.footertxt2}
                            style={{ fontSize: sm ? 10:md?18 : 24,
                                 marginTop: sm ? 0 :md?10 : 50 }}
                        >
                            Safe & Secure Payments
                        </div>
                        <div className={classes.smallfont}
                            style={{ fontSize: sm ? 6 :md?14: 18 }}
                        >
                            PCI level 1 compliant for credit card processing that adheres to highest standards of compliance.

                        </div>
                    </div>
                </div>
            </Grid >

        </>
    )
}
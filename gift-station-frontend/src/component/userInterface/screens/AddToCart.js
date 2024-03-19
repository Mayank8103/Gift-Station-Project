import { Grid } from "@mui/material";
import Recommend from "../Recommend";
import Confidence from "../usercomponent/Confidence";
import Footer from "../usercomponent/Footer";
import Header from "../usercomponent/Header";
import ProductTab from "../usercomponent/ProductTab";
import SelectProduct from "../usercomponent/SelectProduct";
import { useLocation } from "react-router-dom";
import Quantity from "../usercomponent/Quantity";
import { useEffect, useState } from "react";
import { postData } from "../../services/ServerServices";
import Rate from "../usercomponent/Rate";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';



export default function AddToCart(props) {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    var location = useLocation()

    var pdata = JSON.parse(location.state.data)
    // console.log("LOCATION:",data)
    // console.log("LOCATION:", location)
    // console.log("PID",location.state.data.productid)

    const [productListData, setProductlistData] = useState([])
    const [productId, setProductId] = useState(pdata.productid)
    const [refresh, setRefresh] = useState(false)


    const fetch_productlist = async () => {
        var result = await postData('userInterface/fetch_productlist_data',
            { productid: productId }
        )
        setProductlistData(result.data)
       
    

    }
    useEffect(function () {
        fetch_productlist()
    }, [])

    return (
        <>
            <div>

                <Header />
            </div>

            <div style={{ width: '100%', height: 20, background: '#f5f5f5', marginTop: 10 }}>
                {/* <div style={{ marginLeft: 80, paddingTop: 5 }}>
                    HOME | FRAGRANCE | MUSK MEN PERFUME
                </div> */}
            </div>

            <Grid container spacing={2}>
                <Grid item xs={12} md={6} >
                    <SelectProduct data={productListData} refresh={refresh} setRefresh={setRefresh} />

                </Grid>
                <Grid item xs={12} md={6}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft:sm?'30%': md?'10%':'' }}>
                        <Quantity data={productListData} pdata={pdata} refresh={refresh} setRefresh={setRefresh} />
                    </div>

                    <Rate data={productListData}/>
                </Grid>


                <Grid item xs={12}>
                    <ProductTab data={pdata} />
                </Grid>
                <div style={{ width: '100%', height: 50 }}>
                </div>
                <Grid item xs={12}>
                    <Recommend />
                </Grid>
                <Grid item xs={12}>
                    <Confidence />
                </Grid>

                <Grid item xs={12}>

                    <Footer />

                </Grid>
            </Grid>

        </>
    )
}
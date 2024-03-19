import { Grid, Paper } from "@mui/material"
import { useStyles } from "./ProductCSS"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ServerURL, postData } from "../../services/ServerServices";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Selectsubcat(props) {
    var classes = useStyles()
    var navigate = useNavigate()
    var location = useLocation()
    // console.log(location)

    const [categoryId, setCategoryId] = useState(location.state.categoryid)

    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));

    const [subCategoryData, setSubCategoryData] = useState([])


    const fetch_subcategory_data = async () => {
        var result = await postData('userInterface/fetch_subcategory_data', { categoryid: categoryId })
        setSubCategoryData(result.data)
    }

    
    useEffect(function () {
        fetch_subcategory_data()
    }, [])
   
    const handleSubcategory = (item) => {
        navigate("/Products", { state: { subcategoryid: item.subcategoryid } })
    }

    function image() {
        return subCategoryData.map((item) => {
            return (
                <>
                    <Paper style={{ 
                    marginTop:sm?'5%':'2%',
                    marginLeft:sm?'4%':'2%',
                     width:sm?100:md?200:250,
                      height:sm?120:md?270:300,
                      display:'flex', flexDirection:'column', 
                      padding:5
                      }}>
                        <div 
                        style={{ display: 'flex', flexDirection: 'column', 
                        // position: 'relative',
                        //   textAlign:'center',
                          }}
                            onClick={() => handleSubcategory(item)}
                        >
                            <img src={`${ServerURL}/images/${item.subcategoryicon}`}
                                className={classes.midimg}
                                style={{
                                     width: sm ? 100 : md ? 200 :250,
                                      height: sm ? 120 : md ? 200 :240,   }}
                            />
                          
                        </div>
                        <div style={{
                            fontFamily: 'Poppins',
                            fontWeight: 400,
                            fontSize: sm ? 10 : md ?16 :18,
                            display: 'flex', justifyContent: 'center', marginTop: 20,
                            bottom:'5%'
                        }}>
                            {item.subcategoryname}
                        </div>
                      
                    </Paper>
                </>
            )
        })
    }


    return (
        <div>
            <Grid container spacing={2}>
                <div style={{ display: 'flex',justifyContent:'center', width:'100%',flexWrap: 'wrap' ,marginTop:sm?'10%':md?'15%':0}}>
                    {image()}
                </div>

            </Grid>
        </div >
    )
}
import {
    TextField, Grid,
    InputLabel, FormControl, Button, Select, MenuItem,

} from "@mui/material";
import { useState, useEffect } from "react";
import { useStyles } from './productlistCSS';

import { blueGrey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { getData, postData } from "../services/ServerServices";
import Swal from "sweetalert2";
import { DropzoneArea } from 'material-ui-dropzone';


export default function ProductList() {

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(blueGrey[500]),
        backgroundColor: blueGrey[500],
        '&:hover': {
            backgroundColor: blueGrey[700],
        },
    }));
    var classes = useStyles()
    // const [companyId, setCompanyId]= useState()
    const [categoryid, setCategoryid] = useState('')
    const [subcategoryid, setSubCategoryid] = useState('')
    const [productId, setProductId] = useState('')
    const [discription, setDiscription] = useState('')
    const [weight, setWeight] = useState('')
    const [price, setPrice] = useState('')
    const [offerPrice, setOfferPrice] = useState('')
    const [catid, setCatid] = useState([])
    const [subcat, setSubcat] = useState([])
    const [products, setProducts] = useState([])
    const [error, setError] = useState('')
    const [image, setImage] = useState('')



    useEffect(function () {
        fetchCategory()
    }, [])

    // ******  to fetch category **********  
    const fetchCategory = async (event) => {
        var result = await getData('category/fetch_category')
        setCatid(result.data)
    }
    const fillid = () => {
        return catid.map((item) => {
            return (<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>)
        })
    }

    const handleCategoryChange = (event) => {
        setCategoryid(event.target.value)
        fetchallSubcategories(event.target.value)
    }


    //  ********* to fetch Subcategory ************


    const fetchallSubcategories = async (categoryid) => {
        var body = { 'categoryid': categoryid }
        var result = await postData('product/fetch_all_subcategories', body)
        setSubcat(result.data)
    }

    const fillsubcat = () => {
        return subcat.map((item) => {
            return (<MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>)
        })
    }

    const handleSubcatChange = (event) => {
        setSubCategoryid(event.target.value)
        fetchproduct(event.target.value)
    }

    // ********* to fetch Product ***********

    const fetchproduct = async (subcategoryid) => {
        var body = { 'subcategoryid': subcategoryid }
        var result = await postData('product/fetch_all_products', body)
        setProducts(result.data)
    }

    const fillproduct = () => {
        return products.map((item) => {
            return (<MenuItem value={item.productid}>{item.productname}</MenuItem>)
        })
    }

    const handleproductchange = (event) => {
        setProductId(event.target.value)
    }

    // ***************************************






    const handleError = (inputs, value) => {
        setError(prev => ({ ...prev, [inputs]: value }))
    }

    const Validation = () => {
        var isValid = true
        if (!categoryid) {
            handleError("categoryid", "Select Category id !!!")
            isValid = false
        }
        if (!subcategoryid) {
            handleError("subcategoryid", "Select Subcategory !!!")
            isValid = false
        }
        if (!productId) {
            handleError("productId", "Invalid Product Id !!!")
            isValid = false
        }
        if (!weight) {
            handleError("weight", "Invalid Weight !!!")
            isValid = false
        }

        if (!price) {
            handleError("price", "Invalid Price !!!")
            isValid = false
        }
        if (!offerPrice) {
            handleError("offerPrice", "Invalid offerPrice !!!")
            isValid = false
        }

        if (!discription) {
            handleError("discription", "Fill Discription !!!")
            isValid = false
        }

    }


    const clearValue = () => {
        setCategoryid('')
        setSubCategoryid("")
        setProductId("")
        setDiscription("")
        setOfferPrice("")
        setPrice("")
        setWeight("")
    }


    const handleClick = async () => {
        Validation()
        var cd = new Date()
        var dd = cd.getFullYear() + "/" + (cd.getMonth() + 1) + "/" + cd.getDate() + " " + cd.getHours() + ":" + cd.getMinutes() + ":" + cd.getSeconds()

        var formData = new FormData()


        formData.append('categoryid', categoryid)
        formData.append('subcategoryid', subcategoryid)
        formData.append('productid', productId)
        formData.append('weight', weight)
        formData.append('price', price)
        formData.append('offerprice', offerPrice)
        formData.append('discription', discription)
        formData.append('createdat', dd)
        formData.append('createdby', 'ADMIN')
        formData.append('updatedat', dd)

        image.map((item, i) => {
            formData.append("picture" + i, item)
        })

        // console.log(image)

        var result = await postData('productlist/add_new_productlist', formData)
        if (result.status) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: result.message,
                showConfirmButton: true,
                timer: 1500
            })
        }
        else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: result.message,
                showConfirmButton: false,
                timer: 1500
            })
        }
        clearValue()
    }



    const handleImage = (files) => {
        setImage(files)
    }



    function product() {
        return (
            <div className={classes.mainContainer}>
                <div className={classes.box}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} className={classes.rowstyle}>
                            <div><img src="/assets/catlog.png" width='50' alt='picture' /></div>
                            <div className={classes.heading}>
                                Product List
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth error={!error.categoryid ? false : true}>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={categoryid}
                                    label="Category Id"
                                    onChange={handleCategoryChange}

                                    onFocus={() => handleError("categoryid", null)}
                                >
                                    <MenuItem value={'ChooseCategoryId..'}>Choose category..</MenuItem>
                                    {fillid()}
                                </Select>
                                <div style={{ fontSize: 14, color: '#d32f2f', padding: 2 }}>{error.categoryid}</div>

                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth error={!error.subcategoryid ? false : true}>
                                <InputLabel id="demo-simple-select-label">SubCategory</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={subcategoryid}
                                    label="Sub-Category Id"
                                    onChange={handleSubcatChange}

                                    onFocus={() => handleError("subcategoryid", null)}
                                >
                                    <MenuItem value={'ChooseSubCategoryId..'}>Choosesubcategory..</MenuItem>
                                    {fillsubcat()}

                                </Select>
                                <div style={{ fontSize: 14, color: '#d32f2f', padding: 2 }}>{error.subcategoryid}</div>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth error={!error.productId ? false : true}>
                                <InputLabel id="demo-simple-select-label">Product</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={productId}
                                    label="Product Id"
                                    onChange={handleproductchange}

                                    onFocus={() => handleError("productid", null)}
                                >
                                    <MenuItem value={'ChooseProductId..'}>Choose product..</MenuItem>
                                    {fillproduct()}

                                </Select>
                                <div style={{ fontSize: 14, color: '#d32f2f', padding: 2 }}>{error.productId}</div>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField error={!error.weight ? false : true} helperText={error.weight} onFocus={() => handleError("weight", null)} value={weight} onChange={(event) => setWeight(event.target.value)} fullWidth label="weight" variant="outlined" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField value={price} error={!error.price ? false : true} helperText={error.price} onFocus={() => handleError("price", null)} onChange={(event) => setPrice(event.target.value)} fullWidth label="price" variant="outlined" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField value={offerPrice} error={!error.offerPrice ? false : true} helperText={error.offerPrice} onFocus={() => handleError("offerPrice", null)} onChange={(event) => setOfferPrice(event.target.value)} fullWidth label="offerprice" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>

                            <TextField error={!error.discription ? false : true} helperText={error.discription} onFocus={() => handleError("discription", null)} value={discription} onChange={(event) => setDiscription(event.target.value)} fullWidth label="Discription" variant="outlined" />

                        </Grid>
                        <Grid item xs={12}>
                            <div style={{ height: 200, overflowY: 'scroll' }}>
                                <DropzoneArea acceptedFiles={['image/*']}
                                    filesLimit={5}
                                    dropzoneText={"Drag and drop an image here or click"}
                                    onChange={(files) => handleImage(files)} />
                            </div>
                        </Grid>



                        <Grid item xs={6}>
                            <ColorButton onClick={handleClick} fullWidth variant="contained">Submit</ColorButton>
                        </Grid>
                        <Grid item xs={6}>
                            <ColorButton onClick={clearValue} fullWidth variant="contained">Reset</ColorButton>
                        </Grid>

                    </Grid>
                </div>
            </div>
        )


    }

    return (
        <div>
            {product()}
        </div>
    )
}
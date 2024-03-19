import {
    TextField, Grid,
    InputLabel, FormControl, Button, Select, MenuItem, FormLabel, Radio, RadioGroup, FormControlLabel,
    IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useStyles } from './CompanyCss';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Avatar from '@mui/material/Avatar';
import { blueGrey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { getData, postData } from "../services/ServerServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


export default function Product(props) {
    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(blueGrey[500]),
        backgroundColor: blueGrey[500],
        '&:hover': {
            backgroundColor: blueGrey[700],
        },
    }));
    var classes = useStyles()
    var navigate = useNavigate()

    const [categoryid, setCategoryid] = useState('')
    const [subcategoryid, setSubCategoryid] = useState('')
    const [productname, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [trending, setTranding] = useState('')
    const [deals, setDeals] = useState('')
    const [price_type, setPricetype] = useState('')
    const [status, setStatus] = useState('')
    const [picture, setPicture] = useState({ filename: '/assets/backgift.gif', bytes: '' })
    const [catid, setCatid] = useState([])
    const [subcat, setSubcat] = useState([])
    const [error, setError] = useState({})

    const handleImage = (event) => {
        setPicture({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }
    useEffect(function () {
        fetchCategory()
    }, [])

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
    }

    const handletrend = (event) => {
        setTranding(event.target.value)
    }

    const handledeals = (event) => {
        setDeals(event.target.value)
    }

    const handlepriceChange = (event) => {
        setPricetype(event.target.value)
    }

    const handlestatusChange = (event) => {
        setStatus(event.target.value)
    }

    const handleError=(inputs,value)=>{
      setError(prev=>({...prev,[inputs]:value}))
    }

    const Validation=()=>{
        var isValid= true
        if(!categoryid)
        {
            handleError("categoryid","Select Category id !!!")
            isValid= false
        }
        if(!subcategoryid)
        {
            handleError("subcategoryid","Select Subcategory !!!")
            isValid= false
        }
        if(!productname)
        {
            handleError("productname","Invalid Product Name !!!")
              isValid= false
        }
          if(!description)
          {
            handleError("description", "Fill Description !!!")
            isValid= false
          }
        if(!price_type)
        {
           handleError("price_type","Select Price Type !!!")
           isValid=false
        }
        if(!status)
        {
            handleError("status", "Select Status !!!")
            isValid= false
        }
    }

    const clearValue = () =>{
            setCategoryid("");
            setSubCategoryid("");
            setProductName("");
            setDescription("");
            setPricetype("");
            setStatus("");
            setTranding("");
            setPicture("");
            setDeals("");
           
    }


    const handleClick = async() => {
        Validation()
          var cd= new Date()
          var dd = cd.getFullYear()+"/"+(cd.getMonth()+1)+"/"+cd.getDate()+" "+
          cd.getHours()+":"+cd.getMinutes()+":"+cd.getSeconds()
        var formData = new FormData()
        formData.append('categoryid', categoryid)
        formData.append('subcategoryid', subcategoryid)
        formData.append('productname', productname)
        formData.append('description', description)
        formData.append('price_type', price_type)
        formData.append('status', status)
        formData.append('deals', deals)
        formData.append('trending', trending)
        formData.append('picture', picture.bytes)
        formData.append('createdat', dd)
        formData.append('updatedat', dd)
        formData.append('createdby', 'ADMIN')
        formData.append('verify','pending')

        var result = await postData('product/add_new_product', formData)
        if(result.status){
            Swal.fire({
                position:'center',
                icon: 'success',
                title: result.message,
                showConfirmButton: true,
                timer: 1500
              })
        }
        else{
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


    return (
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.rowstyle}>
                        <div style={{display:'flex', flexDirection:'row'}}>
                        <div><img src="/assets/catlog.png" width='50' alt='picture' /></div>
                        <div className={classes.heading}>
                            Product
                        </div>
                        </div>
                        <div>
                        < FormatListBulletedIcon onClick={()=>navigate('/dashboard/displayallproduct')} />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={categoryid}
                                label="Category Id"
                                onChange={handleCategoryChange}
                                error={!error.categoryid?false:true}
                                onFocus={()=>handleError("categoryid",null)}
                            >
                                <MenuItem value={'ChooseCategoryId..'}>Choose category..</MenuItem>
                                {fillid()}
                            </Select>
                            <div style={{fontSize:14, color:'#d32f2f', padding:2}}>{error.categoryid}</div>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">SubCategory</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={subcategoryid}
                                label="Sub-Category Id"
                                onChange={handleSubcatChange}
                                error={!error.subcategoryid?false:true}
                                onFocus={()=>handleError("subcategoryid",null)}
                            >
                                <MenuItem value={'ChooseSubCategoryId..'}>Choosesubcategory..</MenuItem>
                                {fillsubcat()}
                            </Select>
                            <div style={{fontSize:14, color:'#d32f2f',padding:2}}>{error.subcategoryid}</div>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField error={!error.productname?false:true} helperText={error.productname} onFocus={()=>handleError("productname", null)} value={productname} onChange={(event) => setProductName(event.target.value)} fullWidth label="Product Name" variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>

                        <TextField error={!error.description?false:true} helperText={error.description} onFocus={()=>handleError("description",null)} value={description} onChange={(event) => setDescription(event.target.value)} fullWidth label="Description" variant="outlined" />

                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Price Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={price_type}
                                label="Price Type"
                                onChange={handlepriceChange}
                                error={!error.price_type?false:true}
                                onFocus={()=>handleError("price_type",null)}
                            >
                                <MenuItem value={'pcs'}>Pcs</MenuItem>
                                <MenuItem value={'Kg'}>Kg</MenuItem>
                                <MenuItem value={'g'}>g</MenuItem>
                                <MenuItem value={'Ltr'}>Ltr</MenuItem>
                                <MenuItem value={'ml'}>ml</MenuItem>

                            </Select>
                            <div style={{fontSize:13, padding:2, color:'#d32f2f'}}>{error.price_type}</div>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={status}
                                label="Category Id"
                                onChange={handlestatusChange}
                                error={!error.status?false:true}
                                onFocus={()=>handleError("status", null)}
                            >
                                <MenuItem value={'available'}>Available</MenuItem>
                                <MenuItem value={'not available'}>Not Available</MenuItem>

                            </Select>
                            <div style={{fontSize:13, color:'#d32f2f',padding:2}}>{error.status}</div>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Deals</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                onChange={handledeals}
                                value={deals}
                                // error={!error.deals?false:true}
                            >
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Trending</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                onChange={handletrend}
                                value={trending}
                            >
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4} className={classes.rowstyle}>
                        <IconButton color="primary" aria-label="upload picture" component="label">
                            <input hidden accept="image/*" type="file" onChange={handleImage} />
                            <PhotoCamera />
                        </IconButton>
                        
                        <Avatar
                            alt="Company"
                            variant="rounded"
                            src={picture.filename}
                            sx={{ width: 66, height: 66 }}
                        />
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
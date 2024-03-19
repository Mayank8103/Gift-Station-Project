import MaterialTable from "@material-table/core";
import {
    Avatar, Dialog, DialogActions, DialogContent, DialogTitle,
    TextField, InputLabel, FormControl, Select, MenuItem,
    Grid, Button, FormLabel, Radio, RadioGroup, FormControlLabel,
    IconButton,
} from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';

import { useEffect, useState } from "react";
import { getData, postData, ServerURL } from "../services/ServerServices";
import { useStyles } from "./DisplayformCSS";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// 
export default function DisplayAllProduct(props) {
    var classes = useStyles('')
    var navigate= useNavigate()
    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false);
    const [categoryid, setCategoryid] = useState('')
    const [subcategoryid, setSubCategoryid] = useState('')
    const [productname, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [productId, setProductId] = useState('')
    const [trending, setTranding] = useState('')
    const [deals, setDeals] = useState('')
    const [price_type, setPricetype] = useState('')
    const [status, setStatus] = useState('')
    const [picture, setPicture] = useState({ filename: '/assets/backgift.gif', bytes: '' })
    const [catid, setCatid] = useState([])
    const [subcat, setSubcat] = useState([])
    const [btnStatus, setBtnStatus] = useState('')
    const [saveImg, setSaveImg] = useState('')
    const [oldPicture, setOldPicture] = useState('')

    const handleImage = (event) => {
        setPicture({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
        setBtnStatus(true)
    }

    useEffect(function () {
        fetchCategory()
        fetchAllProducts()
    }, [])

    const fetchCategory = async (event) => {
        var result = await getData('category/fetch_category')
        setCatid(result.data)
    }
    const fillid = () => {
        return catid.map((item) => {
            return (
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            )
        })
    }
    const handleCategoryChange = (event) => {
        setCategoryid(event.target.value)
        fetchallSubcategories(event.target.value)
    }

    const fetchallSubcategories = async () => {
        // var body = { 'categoryid': categoryid }
        var result = await getData('subcategory/fetch_all_subcategories')
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

    //   fetch product 
    const fetchAllProducts = async () => {
        var result = await getData('product/fetch_all_product')
        // alert(JSON.stringify(result))
        setProducts(result.data)
    }

    // to close dialoge box
    const handleClose = () => {
        setOpen(false);
    };

    const handleCancelDialoge = async (rowData) => {
               Swal.fire({
            title: 'Do you want to delete?',
            showDenyButton: true,
            
            confirmButtonText: 'Delete',
            denyButtonText: ` Cancel`,
          }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                var result = await postData('product/delete_product', { 'productid': rowData.productid })
 
              Swal.fire('Deleted!', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Changes are not deleted', '', 'info')
            }
          })
          fetchAllProducts()
    }

    //  *********** handle picturemodify button *********
      const handleSave = async () => {
        var formdata = new FormData()
        formdata.append('productid', productId)
        formdata.append('picture', picture.bytes)

        var result = await postData('product/edit_product_logo', formdata)
        if (result.status) {
            setBtnStatus(false)
            setSaveImg(<video src='/assets/icons8-done.mp4' autoPlay />)

        }
    }

    const handleCancel = () => {
        setPicture({ filename: `${ServerURL}/images/${oldPicture}`, bytes: '' })
        setSaveImg('')
        setOldPicture('')
        setBtnStatus(false)
      }

      const PictureBtn = () => {
        return (<div>
            {btnStatus ?
                <div style={{ display: 'flex', padding: 10 }}>
                    <Button onClick={handleSave}>Save </Button>
                    <Button onClick={handleCancel}>Cancel</Button>

                </div > : <div style={{ padding: 15 }}>{saveImg}</div>}
        </div>
        )
    }



    // to open dialoge box

    const handleDialoge = (rowData) => {
        fetchallSubcategories(categoryid)
        setCategoryid(rowData.categoryid);
        setSubCategoryid(rowData.subcategoryid);
        setProductId(rowData.productid)
        setProductName(rowData.productname);
        setDescription(rowData.description);
        setPricetype(rowData.price_type);
        setStatus(rowData.status);
        setTranding(rowData.trending);
        setPicture({ filename: `${ServerURL}/images/${rowData.picture}`, bytes: '' });
        setDeals(rowData.deals);
        setOldPicture(rowData.picture)  
        setOpen(true);
    }

    //   handle edit button
    const handleEdit = async () => {
        var cd = new Date()
        var dd = cd.getFullYear() + "/" + (cd.getMonth() + 1) + "/" + cd.getDate() + " " +
            cd.getHours() + ":" + cd.getMinutes() + ":" + cd.getSeconds()
        var body = {
            'categoryid': categoryid,
            'subcategoryid': subcategoryid,
            'productid': productId,
            'productname': productname,
            'description': description,
            'trending': trending,
            'deals': deals,
            'price_type':price_type,
            'picture': picture.bytes,
            'updatedat': dd,
            'createdby': 'ADMIN',
            'status': status
        }
        var result = await postData('product/edit_product', body)
        if (result.status) {
            setOpen(false)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: result.message,
                showConfirmButton: true,
                timer: 1500
            })
        }
        else {
            setOpen(false)
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: result.message,
                showConfirmButton: false,
                timer: 1500
            })
        }
        fetchAllProducts()

    }

    const showProductDetails = () => {
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src="/assets/catlog.png" width='35' />
                            Edit Product
                        </div>
                        <div><CloseIcon style={{ cursor: 'pointer' }} onClick={handleClose} /></div>

                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2} style={{ marginTop: 10 }}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={categoryid}
                                        label="Category Id"
                                        onChange={handleCategoryChange}
                                    >
                                        <MenuItem value={'ChooseCategoryId..'}>Choose category..</MenuItem>
                                        {fillid()}
                                    </Select>
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
                                    >
                                        <MenuItem value={'ChooseSubCategoryId..'}>Choosesubcategory..</MenuItem>
                                        {fillsubcat()}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField value={productname} onChange={(event) => setProductName(event.target.value)} fullWidth label="Product Name" variant="outlined" />
                            </Grid>
                            <Grid item xs={6}>

                                <TextField value={description} onChange={(event) => setDescription(event.target.value)} fullWidth label="Description" variant="outlined" />

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
                                    >
                                        <MenuItem value={'pcs'}>Pcs</MenuItem>
                                        <MenuItem value={'Kg'}>Kg</MenuItem>
                                        <MenuItem value={'g'}>g</MenuItem>
                                        <MenuItem value={'ml'}>ml</MenuItem>
                                        <MenuItem value={'Ltr'}>Ltr</MenuItem>
                                    </Select>
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
                                    >
                                        <MenuItem value={'available'}>Available</MenuItem>
                                        <MenuItem value={'not available'}>Not Available</MenuItem>

                                    </Select>
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
                                    >
                                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="no" control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Tranding</FormLabel>
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
                                <PictureBtn/>
                            </Grid>

                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEdit} >Save</Button>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );

    }

    function ShowAllProduct() {
        return (
            <div style={{height:450, overflowY:'scroll'}}>
            <MaterialTable

                title="Display Product"
                columns={[
                    { title: 'Category', field: 'category' },
                    { title: 'SubCategory', field: 'subcategory' },
                    { title: 'Product name', field: 'productname',
                       render:rowData=><div>
                        {rowData.productname}<br/>
                        {rowData.description}
                       </div>
                },
                    // { title: 'discription', field: 'description' },
 
                    { title: 'Price Type', field: 'price_type'  },
                    { title: 'Status', field: 'status' },
                    { title: 'Deals', field: 'deals', 
                    render: rowData =>
                    <div>{rowData.deals}<br />
                   {rowData.trending}<br />
                      </div>              
                },
                    // { title: 'Trending', field: 'trending' },
            

                    {
                        title: 'Picture',
                        render: (rowData) => (
                            <Avatar
                                src={`${ServerURL}/images/${rowData.picture}`}
                                style={{ width: 70, height: 70 }}
                                varient="rounded" />
                        )
                    },
                    // {
                    //     title: 'last updation', field: 'createdby',
                    //     render: rowData =>
                    //         <div>{rowData.createdat}<br />
                    //             {rowData.updatedat}<br />
                    //             {rowData.createdby}</div>
                    // },

                ]}
                data={products}
                actions={[
                    {
                        icon:'add',
                        isFreeAction:true,
                        tooltip:"Add Product",
                        onClick:(event)=> navigate('/dashboard/product')
                     },
   
                    {
                        icon: 'edit',
                        tooltip: 'Edit User',
                        onClick: (event, rowData) => handleDialoge(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'delete User',
                        onClick: (event, rowData) => handleCancelDialoge(rowData)
                    }
                ]}
            />
            </div>
        )
    }

    return (
        <div className={classes.mainContainer}>
            <div className={classes.box2}>
            {ShowAllProduct()}
            {showProductDetails()}
        </div>
        </div>

    )
}

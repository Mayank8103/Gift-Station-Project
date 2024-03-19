import MaterialTable from "@material-table/core";
import {
    Avatar, Dialog, DialogActions, DialogContent, DialogTitle,
    TextField, InputLabel, FormControl, Select, MenuItem,
    Grid, Switch, Button,
    IconButton,
} from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';

import { useEffect, useState } from "react";
import { getData, postData, ServerURL } from "../services/ServerServices";
import { useStyles } from "./DisplayformCSS";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


export default function DisplayAllSubCategories(props) {
    var classes = useStyles()
    var navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [open, setOpen] = useState(false);

    const [subcategoryName, setSubCategoryName] = useState('')
    const [discription, setDiscription] = useState('')
    const [status, setStatus] = useState('')
    const [categoryid, setCategoryid] = useState('')
    const [subcategoryid, setSubCategoryid] = useState('')
    const [subcategoryicon, setSubCategoryicon] = useState({ filename: '/assets/backgift.gif', bytes: '' })
    const [catid, setCatid] = useState([])
    const [btnStatus, setBtnStatus] = useState('')   // state for show and hide picturebutton 
    const [oldPicture, setOldPicture] = useState('')  // state to store old Picture
    const [saveImg, setSaveImg] = useState('')


    const handleImage = (event) => {
        setSubCategoryicon({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
     setBtnStatus(true)
    }


    const fetchCategory = async (event) => {
        var result = await getData('category/fetch_all_category')
        setCatid(result.data)
    }

    const fillid = () => {
        return catid.map((item) => {
            return (<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>)
        })
    }

    const handleCategoryChange = (event) => {
        setCategoryid(event.target.value)

    }

    useEffect(function () {
        fetchCategory()
    }, [])


    const handleDialoge = (rowData) => {
        setSubCategoryid(rowData.subcategoryid)
        setCategoryid(rowData.categoryid);
        setStatus(rowData.status)
        setSubCategoryName(rowData.subcategoryname);
        setDiscription(rowData.discription);
        setSubCategoryicon({ filename: `${ServerURL}/images/${rowData.subcategoryicon}`, bytes: '' });
       setOldPicture(rowData.subcategoryicon)
        setOpen(true)
    }

    const handleStatus = (temp) => {
        if (temp == 'Pending') {
            setStatus('Verified')
        }
        if (temp == 'Verified') {
            setStatus('Pending')
        }

    }

    const handleEdit = async () => {
        var cd = new Date()
        var dd = cd.getFullYear() + "/" + (cd.getMonth() + 1) + "/" + cd.getDate() + " " +
            cd.getHours() + ":" + cd.getMinutes() + ":" + cd.getSeconds()
        var body = {
            'categoryid': categoryid,
            'subcategoryid': subcategoryid,
            'subcategoryname': subcategoryName,
            'discription': discription,
            'logo': subcategoryicon.bytes,
            'updatedat': dd,
            'createdby': 'ADMIN',
            'status': status
        }
        var result = await postData('subcategory/edit_subcategory', body)
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
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: result.message,
                showConfirmButton: false,
                timer: 1500
            })
        }
        fetchAllSubcategories()
    }


    const handleCancelDialoge = async (rowData) => {
        var result = await postData('subcategory/delete_subcategory_data', { 'subcategoryid': rowData.subcategoryid })
        if (result.status) {
            setOpen(false)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: result.message,
                showConfirmButton: true,
                timer: 2000
            })
            fetchAllSubcategories()
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
          
    }


    const handleClose = () => {
        setOpen(false);
    };

    const fetchAllSubcategories = async () => {
        var result = await getData('subcategory/fetch_all_subcategories')
        setCategories(result.data)
    }
    useEffect(function () {
        fetchAllSubcategories()
    }, [])


    //  *********** handle picturemodify button *********
    const handleSave = async () => {
        var formdata = new FormData()
        formdata.append('subcategoryid', subcategoryid)
        formdata.append('logo', subcategoryicon.bytes)

        var result = await postData('subcategory/edit_subcategory_logo', formdata)
        if (result.status) {
            setBtnStatus(false)
            setSaveImg(<video src='/assets/icons8-done.mp4' autoPlay />)

        }
    }

    const handleCancel = () => {
        setSubCategoryicon({ filename: `${ServerURL}/images/${oldPicture}`, bytes: '' })
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

    const showSubCategoryDetails = () => {

        return (
            <div>

                <Dialog
                    open={open}
                    // onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src="/assets/catlog.png" width='35' />
                            Edit SubCategory
                        </div>
                        <div><CloseIcon style={{ cursor: 'pointer' }} onClick={handleClose} /></div>

                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2} style={{ marginTop: 10 }}>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Category </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={categoryid}
                                        label="Category Id"
                                        onChange={handleCategoryChange}
                                    >
                                        <MenuItem value={'ChooseCategoryId..'}>Choose id..</MenuItem>
                                        {fillid()}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField value={subcategoryName} onChange={(event) => setSubCategoryName(event.target.value)} fullWidth label="subCategory Name" variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField value={discription} onChange={(event) => setDiscription(event.target.value)} fullWidth label="Discription" variant="outlined" />
                            </Grid>
                            <Grid item xs={6}>
                                {status == 'Pending' ? <Switch onChange={() => handleStatus(status)} /> : <Switch onChange={() => handleStatus(status)} defaultChecked />}
                                {status}
                            </Grid>
                            <Grid item xs={6} className={classes.rowstyle}>
                                <IconButton color="primary" aria-label="upload picture" component="label">
                                    <input hidden accept="image/*" type="file" onChange={handleImage} />
                                    <PhotoCamera />
                                </IconButton>
                                <Avatar
                                    alt="Company"
                                    variant="rounded"
                                    src={subcategoryicon.filename}
                                    sx={{ width: 66, height: 66 }}
                                    value={subcategoryicon}
                                />
                                <PictureBtn/>
                            </Grid>

                        </Grid>



                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEdit} > Save </Button>
                        <Button onClick={handleClose} autoFocus>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }


    function showAllCategory() {
        return (
            <div style={{height:450, overflowY:'scroll'}}>
            <MaterialTable
                title="Display Sub Category"
                columns={[
                    { title: 'Category', field: 'category' },
                    { title: 'SubCategory name', field: 'subcategoryname' },
                    { title: 'discription', field: 'discription' },
                    { title: 'status', field: 'status' },
                    {
                        title: 'subcategoryicon',
                        render: (rowData) => (
                            <Avatar
                                src={`${ServerURL}/images/${rowData.subcategoryicon}`}
                                style={{ width: 70, height: 70 }}
                                varient="rounded" />
                        )
                    },
                ]}
                data={categories}
                actions={[
                    {
                        icon:'add',
                        isFreeAction:true,
                        tooltip:"Add Subcategory",
                        onClick:(event)=> navigate('/dashboard/subcategory')
                     },
   
                    {
                        icon: 'edit',
                        tooltip: 'edit User',
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

    return (<div className={classes.mainContainer}>
        <div className={classes.box1}>
        {showAllCategory()}
        {showSubCategoryDetails()}
        </div>
    </div>
    )
}
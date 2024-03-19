import {
  TextField, Grid,
  InputLabel, FormControl, Button, Select, MenuItem, IconButton,
} from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Avatar from '@mui/material/Avatar';

import { useEffect, useState } from "react";
import { useStyles } from './CompanyCss';
import { blueGrey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { getData, postData } from "../services/ServerServices";
import Swal from "sweetalert2";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useNavigate } from "react-router-dom";



export default function SubCategory(props) {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: blueGrey[500],
    '&:hover': {
      backgroundColor: blueGrey[700],
    },
  }));


  const [subcategoryName, setSubCategoryName] = useState('')
  const [discription, setDiscription] = useState('')
  const [categoryid, setCategoryid] = useState('')
  const [subcategoryicon, setCategoryicon] = useState({ filename: '/assets/backgift.gif', bytes: '' })
  const [catid, setCatid] = useState([])

  const [error, setError] = useState({})

  var classes = useStyles()
  var navigate = useNavigate()

  const handleImage = (event) => {
    setCategoryicon({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
  }


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

  }

  useEffect(function () {
    fetchCategory()
  }, [])

  const clearValue = () => {
    setCategoryid("");

    setSubCategoryName("");
    setDiscription("");
    setCategoryicon("");
  }

  const handleError = (inputs, value) => {
    setError(prev => ({ ...prev, [inputs]: value }))
  }

  const Validation = () => {
    var isValid = true
    if (!subcategoryName) {
      handleError("subcategoryName", "Invalid SubCategory !!!")
      isValid = false
    }

    if (!categoryid || categoryid == "ChooseCategoryId..") {
      handleError("categoryid", "choose Category !!!")
      isValid = false
    }
  }

  const handleClick = async () => {
    Validation()
    var cd = new Date()
    var dd = cd.getFullYear() + "/" + (cd.getMonth() + 1) + "/" + cd.getDate() + " " +
      cd.getHours() + ":" + cd.getMinutes() + ":" + cd.getSeconds()
    var formData = new FormData()
    formData.append('categoryid', categoryid)
    formData.append('subcategoryname', subcategoryName)
    formData.append('discription', discription)
    formData.append('logo', subcategoryicon.bytes)
    formData.append('createdat', dd)
    formData.append('updatedat', dd)
    formData.append('createdby', 'ADMIN')
    formData.append('status', 'Pending')
    var result = await postData('subcategory/add_new_subcategory', formData)
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

  return (
    <div className={classes.mainContainer}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.rowstyle}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div>
              <img src="/assets/catlog.png" width='50' /></div>
            <div className={classes.heading}>
              Subcategory
            </div>
          </div>
          <div>
            < FormatListBulletedIcon onClick={() => navigate('/dashboard/displayallsubcategories')} />
          </div>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category ID</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={categoryid}
              label="Category Id"
              onChange={handleCategoryChange}
              error={!error.categoryid ? false : true}
              onFocus={() => handleError('categoryid', null)}
            >
              <MenuItem value={'ChooseCategoryId..'}>Choose id..</MenuItem>
              {fillid()}
            </Select>
            <div style={{ fontSize: 12, padding: 5, color: '#d32f2f' }}>{error.categoryid}</div>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField error={!error.subcategoryName ? false : true} helperText={error.subcategoryName} onFocus={() => handleError("subcategoryName", null)} value={subcategoryName} onChange={(event) => setSubCategoryName(event.target.value)} fullWidth label="subCategory Name" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField value={discription} onChange={(event) => setDiscription(event.target.value)} fullWidth label="Discription" variant="outlined" />
        </Grid>
        <Grid item xs={12} className={classes.rowstyle}>
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
        </Grid>
        <Grid item xs={6}>
          <ColorButton onClick={handleClick} fullWidth variant="contained">Submit</ColorButton>
        </Grid>
        <Grid item xs={6}>
          <ColorButton onClick={clearValue} fullWidth variant="contained">Reset</ColorButton>
        </Grid>
      </Grid>
    </div>
    </div >

  )
}
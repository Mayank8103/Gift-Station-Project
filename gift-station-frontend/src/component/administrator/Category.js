import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  IconButton,

} from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useStyles } from './CompanyCss'
import Avatar from '@mui/material/Avatar';
import { blueGrey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { postData } from "../services/ServerServices";
import Swal from "sweetalert2";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useNavigate } from "react-router-dom";


export default function Category(props) {


  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: blueGrey[500],
    '&:hover': {
      backgroundColor: blueGrey[700],
    },
  }));

  const [categoryName, setCategoryName] = useState('')
  const [discription, setDiscription] = useState('')
  const [companylogo, setCompanylogo] = useState({ filename: '/assets/backgift.gif', bytes: '' })

  const [error, setError] = useState({})

  var classes = useStyles()
 var navigate = useNavigate()

  const handleImage = (event) => {
    setCompanylogo({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
  }

  const clearValue = () => {
    setCategoryName("");
    setDiscription("");
    setCompanylogo("");

  }

  // ********* Validation handle **************

  const handleError = (inputs, value) => {
    setError(prev => ({ ...prev, [inputs]: value }))
  }

  const Validation = () => {
    var isValid = true
    if (!categoryName) {
      handleError("categoryName", "Invalid Category Name !!!")
      isValid = false
    }
  }


  const handleClick = async () => {
    Validation()
    var cd = new Date()
    var dd = cd.getFullYear() + "/" + (cd.getMonth() + 1) + "/" + cd.getDate() + " " +
      cd.getHours() + ":" + cd.getMinutes() + ":" + cd.getSeconds()
    var formData = new FormData()
    formData.append('categoryname', categoryName)
    formData.append('discription', discription)
    formData.append('logo', companylogo.bytes)
    formData.append('createdat', dd)
    formData.append('updatedat', dd)
    formData.append('createdby', 'ADMIN')
    formData.append('status', 'Pending')
    var result = await postData('category/add_new_category', formData)
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
            <div style={{display:'flex', flexDirection:'row'}}>
            <div ><img src="/assets/catlog.png" width='50' /></div>
            <div className={classes.heading}>
              Category Registration
            </div>
            </div>
            <div>
              < FormatListBulletedIcon onClick={() => navigate('/dashboard/displayallcategories')} />
            </div>
          </Grid>
          <Grid item xs={12}>
            <TextField error={!error.categoryName ? false : true} helperText={error.categoryName} 
            onFocus={() => handleError("categoryName", null)} value={categoryName} 
            onChange={(event) => setCategoryName(event.target.value)} fullWidth label="Category Name" variant="outlined" />
          </Grid>

          <Grid item xs={12}>
            <TextField value={discription} onChange={(event) => setDiscription(event.target.value)} 
            fullWidth label="Discription" variant="outlined" />
          </Grid>


          <Grid item xs={12} className={classes.rowstyle}>
            <IconButton color="primary" aria-label="upload picture" component="label">
              <input hidden accept="image/*" type="file" onChange={handleImage} />
              <PhotoCamera />
            </IconButton>
            <Avatar
              alt="Company"
              variant="rounded"
              src={companylogo.filename}
              sx={{ width: 66, height: 66 }}
              value={companylogo}
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
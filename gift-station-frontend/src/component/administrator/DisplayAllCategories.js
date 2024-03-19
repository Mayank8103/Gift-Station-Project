import MaterialTable from "@material-table/core";
import {
  Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField,
  Grid, Switch,
  IconButton,
} from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { getData, ServerURL, postData } from "../services/ServerServices";
import { useStyles } from "./DisplayformCSS";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

//  ************ declare function ************
export default function DisplayAllCategories(props) {

  const [companies, setCompanies] = useState([])
  const [categoryId, setCategoryid] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [discription, setDiscription] = useState('')
  const [companyLogo, setCompanyLogo] = useState({ filename: '/assets/backgift.gif', bytes: '' })
  const [status, setstatus] = useState('')
  const [btnStatus, setBtnStatus] = useState('')   // state for show and hide picturebutton 
  const [oldPicture, setOldPicture] = useState('')  // state to store old Picture
  const [saveImg, setSaveImg] = useState('')
  var classes = useStyles()
   var navigate = useNavigate()

  // ***** Handle displayimage ******

  const handleImage = (event) => {
    setCompanyLogo({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    setBtnStatus(true)
  }


  const fetchAllCompanies = async () => {

    var result = await getData('category/fetch_all_category')
    setCompanies(result.data)
  }

  const [open, setOpen] = useState(false);


  //  ******* Show data to be edited ***********
  const handleOpenDialoge = (rowData) => {
    setCategoryName(rowData.categoryname);
    setCategoryid(rowData.categoryid)
    setDiscription(rowData.discription);
    setCompanyLogo({ filename: `${ServerURL}/images/${rowData.categoryicon}`, bytes: '' });
    setstatus(rowData.status)
    setOldPicture(rowData.categoryicon)
    setOpen(true)
  }


  const handleClose = () => {
    setOpen(false)
  }


  // ******* Handle Status Butoon varified or pending *******


  const handleStatus = (temp) => {
    if (temp == 'Pending') {
      setstatus('Verified')
    }
    if (temp == 'Verified') { setstatus('Pending') }

  }
  //   ******** Hanlde Edit Button To save Changes ***********
  const handleEdit = async () => {

    var cd = new Date()
    var dd = cd.getFullYear() + "/" + (cd.getMonth() + 1) + "/" + cd.getDate() + " " +
      cd.getHours() + ":" + cd.getMinutes() + ":" + cd.getSeconds()
    var body = {
      'categoryname': categoryName,
      'categoryid': categoryId,
      'discription': discription,
      'updatedat': dd,

      'createdby': 'ADMIN',
      'status': status
    }
    var result = await postData('category/edit_category_data', body)
    if (result.status) {
      setOpen(false)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: result.message,
        showConfirmButton: true,
        timer: 2000
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
    fetchAllCompanies()
  }

  const handleCancelDialoge = async (rowData) => {

    Swal.fire({
      title: 'Do you want to Delete it?',
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
    }).then(async (result) => 

    {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var result = await postData('category/delete_category_data', { 'categoryid': rowData.categoryid })
        Swal.fire('Deleted!', '', 'success')
        fetchAllCompanies()
      } 
      else if (result.isDenied)
       {
        Swal.fire('Canceled', '', 'info')
      }
    })
  }




  //  *********** handle picturemodify button *********
  const handleSave = async () => {
    var formdata = new FormData()
    formdata.append('categoryid', categoryId)
    formdata.append('logo', companyLogo.bytes)

    var result = await postData('category/edit_category_logo', formdata)
    if (result.status) {
      setBtnStatus(false)
      setSaveImg(<video src='/assets/icons8-done.mp4' autoPlay />)

    }

  }


  const handleCancel = () => {
    setCompanyLogo({ filename: `${ServerURL}/images/${oldPicture}`, bytes: '' })
    setSaveImg('')
    setOldPicture('')
    setBtnStatus(false)
  }

  //  Picture button 

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

  const showCategoryDetails = () => {
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
              Edit Catgory
            </div>
            <div><CloseIcon style={{ cursor: 'pointer' }} onClick={handleClose} /></div>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} style={{ marginTop: 20 }}>
              <Grid item xs={12}>
                <TextField value={categoryName} onChange={(event) => setCategoryName(event.target.value)} fullWidth label="Category Name" variant="outlined" />
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
                  src={companyLogo.filename}
                  sx={{ width: 66, height: 66 }}
                  value={companyLogo}
                />
                <PictureBtn />
              </Grid>

            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEdit}> Save </Button>
            <Button onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  useEffect(function () {
    fetchAllCompanies()
  }, [])


  function showAllCategory() {
    return (
      <div style={{height:450, overflowY:'scroll'}}>

      
      <MaterialTable
        title="Display Category"
        columns={[
          { title: 'Category name', field: 'categoryname' },
          { title: 'discription', field: 'discription' },
          { title: 'status', field: 'status', },
          {
            title: 'categoryicon',
            render: (rowData) => (
              <Avatar
                src={`${ServerURL}/images/${rowData.categoryicon}`}
                style={{ width: 70, height: 70 }}
                varient="rounded" />
            )
          },
          {
            title: 'last updation', field: 'createdby',
            render: rowData => <div>{rowData.created_at}<br />{rowData.updated_at}<br />{rowData.created_by}</div>
          },

        ]}
        data={companies}
        actions={[

          {
            icon:'add',
            isFreeAction:true,
            tooltip:"Add Category",
            onClick:(event)=> navigate('/dashboard/category')
         },

          {
            icon: 'edit',
            tooltip: 'Edit User',
            onClick: (event, rowData) => handleOpenDialoge(rowData)
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
    <div className={classes.mainContainer} >
      <div className={classes.box1}>
        {showAllCategory()}
        {showCategoryDetails()}
      </div>
    </div>
  )
}

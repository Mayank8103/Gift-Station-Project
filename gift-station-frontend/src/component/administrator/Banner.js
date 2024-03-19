import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import { DropzoneArea } from "material-ui-dropzone";
import { useState } from "react";
import { useStyles } from "./CompanyCss";
import { } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Swal from "sweetalert2";
import { postData } from "../services/ServerServices";


export default function Banner() {

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText('#e91e63'),
        backgroundColor: '#c2185b',
        '&:hover': {
            backgroundColor: '#a31545',
        },
    }));

    const [status, setStatus] = useState('')
    const [img, setImg] = useState('')

    const handleImage = (files) => {
        setImg(files)
    }

    const clearValue=()=>{
        setStatus('')
        setImg('')
    }

    const handleSubmit = async () => {
        var formData = new FormData()
        formData.append('status', status)
        img.map((item, i) => {
            formData.append("image" + i, item)
           
        })
        var result = await postData('banner/add_new_banner', formData)
        if(result.status){
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
    const handleStatus = (event) => {
        setStatus(event.target.value)
    }


    var classes = useStyles()
    return (
        <div>
            <div className={classes.mainContainer}>
                <div className={classes.box}>
                    <div style={{ fontFamily: "Poppins", fontWeight: "bold", fontSize: 22 }}>
                        Banner
                    </div>
                    <div style={{ marginTop: '5%', marginBottom: '5%', height:350, overflowY:'scroll' }}>
                        <DropzoneArea acceptedFiles={['image/*']}
                            filesLimit={10}
                            dropzoneText={"Drag and drop an image here or click"}
                            onChange={(files) => handleImage(files)} />
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}
                            style={{ display: 'flex', fontFamily: 'Poppins', fontWeight: 'bold', fontSize: 20 }}
                        >
                            <FormControl >
                                <FormLabel id="demo-row-radio-buttons-group-label"
                                    style={{ fontFamily: 'Poppins', fontWeight: 'bold' }}
                                >Status</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    onChange={handleStatus}
                                    value={status}
                                // error={!error.deals?false:true}
                                >
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <ColorButton variant="contained" fullWidth
                                sx={{
                                    height: 50, borderRadius: 2,
                                }} onClick={handleSubmit}
                            >Submit</ColorButton>
                        </Grid>
                        <Grid item xs={6}>
                            <ColorButton variant="contained" fullWidth
                                sx={{
                                    height: 50, borderRadius: 2

                                }}  onClick={clearValue}

                            >Reset</ColorButton>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    )
}
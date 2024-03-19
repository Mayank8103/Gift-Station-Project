import Checkbox from '@mui/material/Checkbox';
import { Badge, Button, Grid, TextField } from "@mui/material"
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { getData, postData } from '../../services/ServerServices';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Information(props) {
    // console.log("Info",props)
    var user = useSelector((state) => state.user)
    console.log("USER:", user)
    // var userData= Object.values(user)
    // console.log("Values;", userData)

    const navigate = useNavigate()
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));

    const [emailAddress, setEmailAddress] = useState('')
    const [mobilenumber, setMobileNumber] = useState('')
    const [error, setError] = useState({})
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [apartment, setApartment] = useState('')
    const [zipcode, setZipCode] = useState('')
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])

   var dispatch= useDispatch()

   useEffect(function () {
    fetchallstates()
  }, [])


  const fetchallstates = async (event) => {
    var result = await getData('statecity/fetch_all_states')
    setStates(result.data)
  }

  const fillstates = () => {
    return states.map((item) => {
      return (<MenuItem value={item.state_id}>{item.statename}</MenuItem>)
    })
  }

  const handleChange = (event) => {
    setState(event.target.value)
    fetchallcities(event.target.value)
  }

  const fetchallcities = async (state_id) => {
    var body = { 'state_id': state_id }
    var result = await postData('statecity/fetch_all_cities', body)
    setCities(result.data)
  }

  const fillcities = () => {
    return cities.map((item) => {
      return (<MenuItem value={item.city_id}>{item.cityname}</MenuItem>)
    })
  }
  const handleCityChange = (event) => {
    setCity(event.target.value)
  }

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };
    

   

    const handleError = (inputs, value) => {
        setError(prev => ({ ...prev, [inputs]: value }))
    }

    const Validation = () => {
        var isValid = true
        if (!emailAddress) {
            handleError("emailAddress", "Invalid Email Address !!!")
            isValid = false
        }

        if (!address) {
            handleError("address", "Invalid Shipping Address !!!")
            isValid = false
        }

        if (!firstName) {
            handleError("firstname", "Invalid Name !!!")
            isValid = false
        }

        if (!lastName) {
            handleError("lastname", "Invalid Name!!!")
            isValid = false
        }

    }
    const handleClick = async () => {
        Validation()

        var body = {
            "userid": props.userData.userid,
            "country": country,
            "address": address,
            "fullname": firstName,
            "apartment": apartment,
            "state": state,
            "city": city,
            "zipcode": zipcode,
            "mobilenumber": props.userData.mobilenumber
        }
        var result = await postData('userInterface/add_new_address', body)
        if (result.status) {
            alert("Address Submitted Successfully")
            dispatch({ type: 'ADD_USER', payload: [body.mobile_number,[body]] })
            props.Close()
        }
        else {
            alert("Fail to submit Address")
            navigate(-1)
            props.Close()
        }
    }


    return (
        <div>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column', marginTop: '1%',
                        marginBottom: '10%',
                        fontFamily: 'Poppins', fontSize: 14, fontWeight: 500,
                    }} >

                        <div>
                            <Box sx={{ width: 450, marginTop: 2 }}>
                                <FormControl style={{ width: '100%' }}>
                                    <InputLabel required id="demo-simple-select-label">Country</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={country}
                                        label="country"
                                        onChange={handleCountryChange}
                                    >
                                        <MenuItem value="india">India</MenuItem>
                                        {/* <MenuItem value={20}>USA</MenuItem>
                                        <MenuItem value={30}>JAPAN</MenuItem> */}
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                        <div style={{ marginTop: 8 }}>
                            <TextField required variant='outlined' value={firstName} onChange={(event)=>setFirstName(event.target.value)} placeholder="Full name" style={{ width: '100%', height: 10 }} />
                            {/* <TextField required variant='outlined' value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="last name" style={{ width: '50%', height: 10, marginLeft: '2%' }} /> */}
                        </div>
                        <div style={{ marginTop: 42 }}>
                            <TextField required variant='outlined' value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Address" style={{ width: '48%', height: 10 }} />
                            <TextField variant='outlined' value={apartment} onChange={(event) => setApartment(event.target.value)} placeholder="Apartment,suit,etc(optional)" style={{ width: '47%', height: 10, marginLeft: '5%' }} />
                        </div>

                        <div>
                            <Box sx={{ width: '100%', marginTop: 6, display: 'flex', flexDirection: 'row' }}>
                                <FormControl fullWidth style={{ marginRight: 20, width: '50%' }}>
                                    <InputLabel required id="demo-simple-select-label">State</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={state}
                                        label="state"
                                        onChange={handleChange}
                                    >
                                         <MenuItem value={'ChooseState..'}>Choose State..</MenuItem>
                                        {fillstates()}
                                        {/* <MenuItem value='mp'>MadhyaPradesh</MenuItem>
                                        <MenuItem value="up">UttarPradesh</MenuItem>
                                        <MenuItem value='pb'>Punjab</MenuItem> */}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth style={{ width: '50%' }}>
                                    <InputLabel required id="demo-simple-select-label">City</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={city}
                                        label="city"
                                        onChange={handleCityChange}
                                    >
                                         <MenuItem value={'ChooseState..'}>Choose State..</MenuItem>
                                         {fillcities()}
                                        {/* <MenuItem value='indore'>Indore</MenuItem>
                                        <MenuItem value='gwalior'>Gwalior</MenuItem>
                                        <MenuItem value='bhopal'>Bhopal</MenuItem> */}
                                    </Select>
                                </FormControl>
                            </Box>
                            <div style={{ marginTop: 8 }}>
                                <TextField variant='outlined' value={zipcode} onChange={(event) => setZipCode(event.target.value)}
                                    placeholder="Zip Code"
                                    style={{
                                        width: '47%',
                                        height: 10,
                                        // marginLeft: 10
                                    }} />
                                <TextField variant='outlined' value={props.userData.mobilenumber}
                                    placeholder="Phone (optional)"
                                    style={{
                                        width: '48%',
                                        height: 10, 
                                        marginLeft:'5%'
                                    }} />
                                <HelpOutlineOutlinedIcon
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end'
                                        , marginLeft: '90%', fontSize: 16
                                    }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', width: '70%', marginTop:'10%', marginLeft: 70 }}>
                                <Button variant='contained' onClick={handleClick}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        background: '#dc2f2f',
                                        alignItems: 'center',
                                        height: '9vh',
                                        fontFamily: 'Poppins',
                                        color: '#fff',
                                        fontSize: 16,
                                        borderRadius: 2,
                                        textTransform: 'capitalize',

                                        "&: hover": {
                                            backgroundColor: '#f83e4b',
                                            color: '#fff'
                                        }
                                    }}>
                                    Continue
                                </Button>
                            </div>
                        </div>
                    </div>

                </Grid>
            </Grid>

        </div>
    )
}
import * as React from 'react';
import {
    Box,
    Button,
    Divider,
    Drawer,
    List,
    ListItem,
} from "@mui/material"

import ClearIcon from '@mui/icons-material/Clear';
import { useEffect } from 'react';
import { useState } from 'react';
import { getData, ServerURL } from '../services/ServerServices';
import { useStyles } from './usercomponent/HeaderCSS';
import { useNavigate } from 'react-router-dom';

export default function MenuBarDrawer(props) {

    var navigate= useNavigate()
    var classes = useStyles()
    const [state, setState] = React.useState(false);
    const [category, setCategory]= useState([])
    const [msg,setMsg]=useState('')

    // const [categoryId, setCategoryId] = useState(category.category)


    const fetchCategory = async () => {
        var result = await getData("userInterface/fetch_category_data",)

        setCategory(result.data)
    }
    useEffect(function () {

        fetchCategory()
    }, [])

    const catData = () => {
        return (
            category.map((item) => {
                return (
                    <div className={classes.text}>{item.categoryname}</div>
                )
            })
        )
    }
       
    const handleClick=(item)=>{
       
       navigate('/subcatedisplay', { state: {categoryid:item.categoryid }})
    }

    useEffect(function () {
        setState(props.opens)
    }, [props.opens])

    const handleClose = () => {
        setState(false)
        props.setOpens(false)
    }

     const handletext=()=>{
         setMsg("Created by Mayank")
     }
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState(open);
    };
    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 280 }}
            role="presentation"
            // onClick={toggleDrawer('left', false)}
            onKeyDown={toggleDrawer('left', false)}
        >
           
            <Divider />
            <List>
                {category.map((text,index) => (
                    <ListItem key={text} disablePadding style={{borderBottom: "solid 1px #dfe6e9",}}>
                        <div style={{margin:'5%',padding:'5%', fontFamily:'Poppins',fontWeight:'bold', fontSize:20, letterSpacing:2,display:'flex', alignItems:'center'}}
                        onClick={()=>handleClick(text)}
                        >
                        <img src={`${ServerURL}/images/${text.categoryicon}`} 
                        
                        style={{width:50, marginRight:10}}
                        />
                        {text.categoryname}
                        </div>
                        
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    return (
        <div>

            <React.Fragment key={'left'}>

                <Drawer
                    anchor={'left'}
                    open={state}
                    onClose={toggleDrawer('left', false)}
                    onClick={handleClose}
                >

                    <div style={{ display: 'flex', marginTop: '4%', borderBottom: "solid 1px #dfe6e9", justifyContent:'space-between' }}>
                        <div onClick={handletext} style={{ fontFamily: 'Poppins', fontWeight: "bold", fontSize: 20, marginLeft: '3%', marginBottom: '2%',display:'flex', alignSelf:'flex-start' }}>
                          Menu Bar
                        </div>
                        <div style={{ marginRight: "3%" , display:'flex',justifyContent:'center'}}>
                            <ClearIcon style={{display:'flex', justifyContent:'flex-end'}} />
                        </div>
                       
                    </div>
                    <div >

                    {list()}
                    <Button onClick={handletext}></Button>
                    <div 
                    style={{display:'flex',
                            justifyContent:'center',
                            fontWeight:'bold', marginBottom:10}}>{msg}</div>
                    </div>
                </Drawer>
            </React.Fragment>


        </div>
    )
}


import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { NavLink } from 'react-router-dom';

export const mainListItems = (

  <React.Fragment>
      <NavLink to="/Dashboard" style={{textDecoration:'none', color:'#000',fontFamily:'Poppins', fontWeight:600, fontSize:18}}>
    <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
      </NavLink>
      <NavLink to="/Dashboard/Category" style={{textDecoration:'none', color:'#000',fontFamily:'Poppins', fontWeight:600, fontSize:18}}>
    <ListItemButton>
        <ListItemIcon >
          <ShoppingCartIcon />
        </ListItemIcon>
      <ListItemText primary="Category" />
    </ListItemButton>
      </NavLink>

        <NavLink to="/Dashboard/subCategory" style={{textDecoration:'none', color:'#000',fontFamily:'Poppins', fontWeight:600, fontSize:18}}>
    <ListItemButton>
      <ListItemIcon>
          <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="subcategory" />
    </ListItemButton>
        </NavLink>

        <NavLink to="/Dashboard/Product" style={{textDecoration:'none', color:'#000',fontFamily:'Poppins', fontWeight:600, fontSize:18}}>
    <ListItemButton>
      <ListItemIcon>
          <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Product" />
    </ListItemButton>
        </NavLink>

        <NavLink to="/Dashboard/productlist" style={{textDecoration:'none', color:'#000',fontFamily:'Poppins', fontWeight:600, fontSize:18}}>
    <ListItemButton>
      <ListItemIcon>
          <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Add Product" />
    </ListItemButton>
        </NavLink>
  </React.Fragment>
);

export const secondaryListItems = (

  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader> */}
        <NavLink to="/Dashboard/DisplayAllCategory" style={{textDecoration:'none', color:'#000',fontFamily:'Poppins', fontWeight:600, fontSize:18}}>
    <ListItemButton>
      <ListItemIcon>

          <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Display Category" />
    </ListItemButton>
        </NavLink>
        <NavLink to="/Dashboard/DisplayAllSubCategory" style={{textDecoration:'none', color:'#000',fontFamily:'Poppins', fontWeight:600, fontSize:18}}>
    <ListItemButton>
      <ListItemIcon>

          <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Display Subcategory" />
    </ListItemButton>
        </NavLink>

        <NavLink to="/Dashboard/DisplayAllProduct" style={{textDecoration:'none', color:'#000',fontFamily:'Poppins', fontWeight:600, fontSize:18}}>
    <ListItemButton>
      <ListItemIcon>
          <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="DisplayProduct" />
    </ListItemButton>
        </NavLink>
  </React.Fragment>
);

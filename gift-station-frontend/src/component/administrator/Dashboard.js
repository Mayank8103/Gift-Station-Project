import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listitem';
import { Routes, Route, useNavigate, json } from 'react-router-dom';
import Category from './Category';
import SubCategory from './SubCategory';
import Product from './Product';
import ProductList from './productlist';
import DisplayAllCategories from './DisplayAllCategories';
import DisplayAllSubCategories from './DisplayAllSubCategories';
import DisplayAllProduct from './DisplayAllProduct';
import { ServerURL } from '../services/ServerServices';



const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  var admin = JSON.parse(localStorage.getItem('ADMIN'))
  console.log("ADMIN",admin)
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };



  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} style={{
          background: "rgb(252,70,107)",
          background: "radial-gradient(circle, rgba(252,70,107,0.6547870421677493) 0%, rgba(239,117,51,0.6828769298081987) 0%, rgba(207,7,44,0.6547870421677493) 89%)",
        }}>
          <Toolbar
            sx={{
              pr: '20px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              onClick={toggleDrawer}

            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}
            >
              <CardGiftcardIcon style={{ marginTop: 5, marginRight: 5 }} />
              Gift-Station
            </Typography>

            <IconButton color="inherit">


              {/* <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge> */}
            </IconButton>
            <b> {admin.adminname} </b>
            <Stack style={{display:'flex', flexDirection:'row', marginLeft:15}}>
              <Avatar
                alt="V"
                src={`${ServerURL}/images/${admin.picture}`}
                sx={{ width: 50, height: 50 }}
              />
            </Stack>

          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              px: [1],
            }}
          >
            <b> {admin.adminname} </b>
            <IconButton onClick={toggleDrawer}>
              {/* <ChevronLeftIcon /> */}
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route element={<Category />} path={"/category"} />
              <Route element={<SubCategory />} path={"/subcategory"} />
              <Route element={<Product />} path={"/product"} />
              <Route element={<ProductList />} path={"/productlist"} />
              <Route element={<DisplayAllCategories />} path={"/displayallcategory"} />
              <Route element={<DisplayAllSubCategories />} path={"/displayallsubcategory"} />
              <Route element={<DisplayAllProduct />} path={"/displayallproduct"} />
            </Routes>
          </Container>
        </Box>

      </Box>
    </ThemeProvider >
  );
}

export default function Dashboard() {
  var navigate = useNavigate()
  var admin = JSON.parse(localStorage.getItem('ADMIN'))
  //  console.log("ADMIN D", admin)
  //  console.log("ADMIN n", admin.adminname)
  return <DashboardContent />;
}
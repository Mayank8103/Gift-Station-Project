
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Admin from './component/administrator/Admin';
import Dashboard from './component/administrator/Dashboard';
import DisplayProductList from './component/administrator/DisplayProductList';
import Home from './component/userInterface/screens/Home';
import Login from './component/userInterface/screens/Account/Login';
import SignUp from './component/userInterface/screens/Account/SignUp';
import Banner from './component/administrator/Banner';
import AllProduct from './component/userInterface/screens/AllProduct';
import Subcatdisplay from './component/userInterface/screens/Subcatdisplay';
import AddToCart from './component/userInterface/screens/AddToCart';
import ViewCart from './component/userInterface/screens/ViewCart';
import Products from './component/userInterface/screens/Products';
import AddressDialog from './component/userInterface/usercomponent/AddressDialog';
import Information from './component/userInterface/usercomponent/Information';
import Makepayment from './component/userInterface/usercomponent/MakePayment';
import Order from './component/userInterface/usercomponent/Order';





function App() {
  return (
    <div>
      <Router>
        <Routes>
          
          <Route element={<Admin/>} path={"/adminlogin"} />
          <Route element={<Dashboard/>} path={"/dashboard/*"} />
          <Route element={<DisplayProductList/>} path={"/displayProductList"}  />
          <Route element={<Home/>} path={"/home"}/>
          <Route element={<Login/>} path={"/login"}/>
          <Route element={<SignUp/>} path={"/signup"}/>
          <Route element={<Subcatdisplay/>} path={"/subcatedisplay"}  />
          <Route element={<AddToCart/>} path={"/addtocart"} />
         <Route element= {<Products/>} path={'/products'} />
          <Route element={<Banner/>} path={"/banner"} />
          <Route element={<AllProduct/>} path={"/allproduct"}/>
          <Route element={<ViewCart/>} path={"/viewcart"}/>
          <Route element={<Information/>} path={"/information"} />
          <Route element={<Makepayment/>} path={"/makepayment"}/>
          <Route element={<Order/>} path={"/order"}/>
        </Routes>
      </Router>    
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Auth from './components/Auth';
import Main from './components/Main';
import Stats from './components/Stats';
import OrderDetails from './components/OrderDetails';
import FoodProviderMain from './components/FoodProviderMain';
import AddFoodForm from './components/AddFoodForm';
import SelfOffers from "./components/SelfOffers";
import FoodWastage from "./components/FoodWastage";
import Feedback from "./components/Feedback";
import GridViewIcon from '@mui/icons-material/GridView';
import HomeIcon from '@mui/icons-material/Home';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ChatIcon from '@mui/icons-material/Chat';
import Orders from "./components/Orders";

function App() {
  // return <AddFoodForm />
  // return <FoodProviderMain />
  // return <OrderDetails />
  // return <Stats />
  // return <Main />
  // return <Auth />
  return (
    
    <BrowserRouter>
      {localStorage.getItem("userID") ? 
      <div style={{ position: "absolute", top:"20px", right:"20px", borderStyle:"solid", borderWidth:"2px", padding:"10px", display:"flex", flexDirection:"column" }}>
        <div>
          {localStorage.getItem("userID")}
        </div>
        <div>
          <Link to="/">
            <HomeIcon />
          </Link>
        </div>
        <div>
          <Link to="/food-prover-main">
            <GridViewIcon />
          </Link>
        </div>
        <div>
          <Link to="/orders">
            <AddShoppingCartIcon />
          </Link>
        </div>
        <div>
          <Link to="/feedback">
            <ChatIcon />
          </Link>
        </div>

      </div> : <></>}
      <Routes>
          <Route index path="/" element={<Main />} />
          <Route path="orders" element={<Orders />} />
          <Route path="food-prover-main" element={<FoodProviderMain />} />
          <Route path="food-wastage" element={<FoodWastage />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="self-offers/:id" element={<SelfOffers />} />
          <Route path="offer/:id1/:id2" element={<OrderDetails />} />
          <Route path="food-wastage" element={<Stats />} />
          <Route path="auth" element={<Auth />} />
          <Route path="/food-form" element={<AddFoodForm />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

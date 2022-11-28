import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  // return <AddFoodForm />
  // return <FoodProviderMain />
  // return <OrderDetails />
  // return <Stats />
  // return <Main />
  // return <Auth />
  return (
    
    <BrowserRouter>
      {localStorage.getItem("userID") ? <div style={{ position: "absolute", top:"20px", right:"20px", borderStyle:"solid", borderWidth:"2px", padding:"10px" }}>
        {localStorage.getItem("userID")}
      </div> : ""}
      <Routes>
          <Route index path="/" element={<Main />} />
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

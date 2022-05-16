import './App.css';
import Header from './component/Header/Header';
import Shop from './component/Shop/Shop';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Review from './component/Review/Review';
import Inventory from './component/Inventory/Inventory';
import Error from './component/Error/Error';
import SingleProduct from './component/SingleProduct/SingleProduct';
import Shipment from './component/Shipment/Shipment';
import Login from './component/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
import Profile from './component/Profile/Profile';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="*" element={<Error />} />
          <Route path="/" element={<Shop></Shop>} />
          <Route path="shop" element={<Shop></Shop>} />
          <Route path="profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="review" element={<Review />} />
          <Route path="orders" element={
            <PrivateRoute>
              <Inventory />
            </PrivateRoute>
          } />
          <Route path="login" element={<Login />} />
          <Route path="shipment" element={
            <PrivateRoute>
              <Shipment />
            </PrivateRoute>
          } />
          <Route path="/product/:key" element={<SingleProduct />} />
        </Routes>
      </Router>
      <p className='text-center'>
        <small>&copy; All Copyright reserved By <span className='text-danger'>Aditya Chowdhury</span></small>
      </p>
    </UserContext.Provider>
  );
}

export default App;

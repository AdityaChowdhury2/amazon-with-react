import './App.css';
import Header from './component/Header/Header';
import Shop from './component/Shop/Shop';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Review from './component/Review/Review';
import Inventory from './component/Inventory/Inventory';
import Error from './component/Error/Error';
import SingleProduct from './component/SingleProduct/SingleProduct';

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Shop></Shop>} />
          <Route path="/shop" element={<Shop></Shop>} />
          <Route path="/review" element={<Review />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/product/:key" element={<SingleProduct />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </Router>
      <p className='text-center'>
        <small>&copy; All Copyright reserved By <span className='text-danger'>Aditya Chowdhury</span></small>
      </p>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './component/HomePage/Homepage';
import LoginSignUp from './component/LoginSignUp/LoginSignUp';
import Buyproduct from './component/buyproduct';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import { UserProvider } from './usercontext';
import Cart from './component/cart'
import './component/cart'
// import Notification from './component/notification'
import Notification from './component/notification'
import Billpage from './billpage';

export default function App() {
  return (
    <UserProvider>
    <Router>
      <div>
        <Routes>
          <Route path="/cart" element={<Cart/>} />
          <Route path="/" element={<LoginSignUp/>} />
          <Route path="/billpage" element={<Billpage/>} />
          <Route path="/homepage" element={<Homepage/>} />
          <Route path="/notificationpage" element={<Notification/>} />
          <Route path="/buyproduct" element={<Buyproduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productname" element={<Buyproduct />} />
        </Routes>
      </div>
    </Router>
   </UserProvider>
  );
}

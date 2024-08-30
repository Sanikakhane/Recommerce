import React from 'react';
import Homepage  from './component/HomePage/Homepage';
import LoginSignUp from './component/LoginSignUp/LoginSignUp';
import '@fortawesome/fontawesome-free/css/all.min.css';



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// A new Navbar component

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginSignUp />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/about" element={<Homepage />} />
          <Route path="/labs" element={<Homepage />} />
        </Routes>
      </div>
    </Router>
  );
}

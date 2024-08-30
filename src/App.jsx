import './App.css';
import { Homepage } from './component/HomePage/Homepage';
import { NavbarAfterLogin } from './component/After_Login/NavbarAfterLogin';
import LoginSignUp from './component/LoginSignUp/LoginSignUp';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <div>
        <LoginSignUp />
        <NavbarAfterLogin />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/support" element={<Homepage />} />
          <Route path="/about" element={<Homepage />} />
          <Route path="/labs" element={<Homepage />} />
          <Route path="*" element={<Homepage />} />
        </Routes>
      </div>
    </Router>
  );

}
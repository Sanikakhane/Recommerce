import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import Logo from '../../assets/logo.png'; 
import './Navbar.css';

export const NavbarAfterLogin = () => {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={Logo} alt="Logo" className="logo-img" />
        </a>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ marginRight: '10px' }}>
                  My Account
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">Profile</Dropdown.Item>
                  <Dropdown.Item href="#">Order History</Dropdown.Item>
                  <Dropdown.Item href="#">Cart</Dropdown.Item>
                  <Dropdown.Item href="#">Notifications</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  );
};

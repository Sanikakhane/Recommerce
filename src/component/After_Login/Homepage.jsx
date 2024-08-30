import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Homepage.css';
import Pic1 from '../../assets/pic1.png';
import Pic2 from '../../assets/pic2.png';
import Pic3 from '../../assets/pic3.png';

const products = [
  { id: 1, type: 'Electronics', name: 'Product 1', price: 49.99, img: Pic1 },
  { id: 2, type: 'Clothing', name: 'Product 2', price: 59.99, img: Pic2 },
  { id: 3, type: 'Sports', name: 'Product 3', price: 69.99, img: Pic3 },
  // Add more products here...
];

export const Homepage = () => {
  const [selectedType, setSelectedType] = useState('All');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const filteredProducts = selectedType === 'All'
    ? products
    : products.filter(product => product.type === selectedType);

  return (
    <div className="homepage">
      {/* Hamburger Menu Icon */}
      <div className="hamburger-icon" onClick={toggleSidebar}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Slide Bar for Product Types */}
      <div className={`slider-bar ${sidebarOpen ? 'open' : ''}`}>
        {['All', 'Electronics', 'Clothing', 'Sports'].map((type) => (
          <div
            key={type}
            className={`slider-item ${selectedType === type ? 'active' : ''}`}
            onClick={() => handleTypeChange(type)}
          >
            {type}
          </div>
        ))}
      </div>

      {/* Products Section */}
      <div className={`container my-5 ${sidebarOpen ? 'shifted' : ''}`}>
        <h2 className="text-center mb-4">Available Products</h2>
        <div className="row">
          {filteredProducts.map(product => (
            <div className="col-lg-4 col-md-6 mb-4" key={product.id}>
              <div className="card">
                <img src={product.img} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">₹{product.price.toFixed(2)}</p>
                  <a href="#" className="btn btn-primary">Add to Cart</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

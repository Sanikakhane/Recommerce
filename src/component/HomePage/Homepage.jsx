import React, { useState, useEffect } from 'react';
import './Homepage.css';
import axios from 'axios';

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/getproducts');
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search for:', searchTerm);
  };

  return (
    <div>
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <i className="fa fa-times icon" onClick={toggleSidebar}></i>
        <h2>Menu</h2>
        <ul>
          <li>Amazon</li>
          <li>Best Sellers</li>
          <li>Shop by Category</li>
          <li>Food Products</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`main-content ${sidebarOpen ? 'with-sidebar' : ''}`}>
        <i className="fa fa-bars icon" onClick={toggleSidebar}></i>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className='search_input'
          />
          <button onClick={handleSearch}>
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
        {/* Render products */}
        <div className="product-list">
          {products.map(product => (
            <div key={product._id} className="product-card">
              <img src={product.link} alt={product.name} className="product-image" />
              <div className="product-info">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-price">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    
  );
};

export default Homepage;

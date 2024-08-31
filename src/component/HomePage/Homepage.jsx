import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';
import axios from 'axios';

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();

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

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }
    const filteredSuggestions = products.filter(product =>
      product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    console.log('Filtered Suggestions:', filteredSuggestions);
    setSuggestions(filteredSuggestions);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === '') {
      setSuggestions([]);
    } else {
      handleSearch();
    }
  };

  const handleSuggestionClick = (productName) => {
    setSearchTerm(productName);
    setSuggestions([]);
    navigate(`/product/${productName}`);
  };

  const buyproductpage = (productname) => {
    navigate(`/product/${productname}`);
  };

  function gotocart() {
    navigate('/cart');
  }

  function notoficationpage() {
    navigate('/notificationpage');
  }

  return (
    <div>
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''} bg-slate-800`}>
        <i className="fa fa-times icon" onClick={toggleSidebar}></i>
        <p className="text-3xl">Menu</p>
        <div className="sidelist">
          <h3 className="gotocart">History</h3>
          <h3>Settings</h3>
          <h3>Orders</h3>
          <h3 onClick={gotocart}>Cart</h3>
          <h3 onClick={notoficationpage}>Notifications</h3>
        </div>
      </div>

      {/* Main Content */}
      <div className={`main-content ${sidebarOpen ? 'with-sidebar' : ''}`}>
        {sidebarOpen ? '' : <i className="fa fa-bars icon" onClick={toggleSidebar}></i>}

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search..."
            className="search_input"
          />
          {/* Dropdown for suggestions */}
          {suggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {suggestions.map((product) => (
                <div
                  key={product._id}
                  className="suggestion-item "
                  style={{ border: '1px solid red' }}
                  onClick={() => handleSuggestionClick(product.name)}
                >
                  {product.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Render products */}
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-card" onClick={() => buyproductpage(product.name)}>
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

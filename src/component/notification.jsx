import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../usercontext'; // Ensure this path is correct
import '../notification.css'; // Import the CSS file

const Notification = () => {
  const [cartData, setCartData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [retrying, setRetrying] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const { username } = useContext(UserContext); // Get username from context

  // Fetch cart data
  const fetchCartData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/getcart?username=${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart data');
      }

      const data = await response.json();
      if (data.data && data.data.length > 0) {
        setCartData(data.data);
        setLoading(false); // Data is fetched, stop loading
        setRetrying(false);

        // Fetch product suggestions for each unique product type
        const uniqueTypes = Array.from(new Set(data.data.map(item => item.product_type))); // Updated field name
        uniqueTypes.forEach(type => fetchProductSuggestions(type));
      } else {
        // Retry after a short delay if no data is returned
        setRetrying(true);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false); // Stop loading if there's an error
      setRetrying(false); // Stop retrying on error
    }
  };

  // Fetch product suggestions based on product type
  const fetchProductSuggestions = async (type) => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/getproductbytype', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: type }), // Sending product_type field
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product suggestions');
      }

      const data = await response.json();
      
      // Limit the suggestions to 2 products per type
      const limitedProducts = data.data.slice(0, 2);
      setSuggestions(prevSuggestions => [...prevSuggestions, { type, products: limitedProducts }]);
    } catch (err) {
      console.error(`Failed to fetch suggestions for type ${type}:`, err);
    }
  };

  useEffect(() => {
    if (username) {
      fetchCartData();
    }
  }, [username]); // Fetch data when username changes

  useEffect(() => {
    if (retrying) {
      const timer = setTimeout(fetchCartData, 3000); // Retry every 3 seconds
      return () => clearTimeout(timer); // Clean up timeout if the component unmounts or retrying is stopped
    }
  }, [retrying]); // Retry fetching when retrying is true

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="notification-container">
      <div className="notification-header">
        <div className="if-you-like">
          <h1>IF YOU LIKE THIS......</h1>
        </div>
        <div className="you-might-also-like">
          <h2>YOU MIGHT ALSO LIKE THESE</h2>
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
      {cartData.length > 0 ? (
        <div className="cart-display">
          {cartData.map((item, index) => (
            <div key={index} className="cart-item-wrapper">
              <div className="cart-item">
                <img src={item.link} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h2 className="cart-item-name">{item.name}</h2>
                  <p className="cart-item-price">Price: ${item.price}</p>
                </div>
              </div>
              <div className="suggestions">
                {suggestions
                  .filter(suggestion => suggestion.type === item.product_type) // Match the type
                  .map((suggestion, idx) => (
                    <div key={idx} className="suggestion-section">
                      {suggestion.products.map((product, idx) => (
                        <div key={idx} className="suggestion-item">
                          <img src={product.link} alt={product.productname} className="suggestion-item-image" />
                          <div className="suggestion-item-info">
                            <h4 className="suggestion-item-name">{product.productname}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No items in your cart.</p>
      )}
    </div>
  );
};

export default Notification;

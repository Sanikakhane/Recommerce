import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from './usercontext';
import './BillFetch.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

const BillFetch = () => {
  const { username } = useContext(UserContext);
  const [cartData, setCartData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Correct usage of useNavigate hook

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!username) {
          throw new Error('Username is not available');
        }

        const response = await fetch(`http://localhost:8000/api/v1/getcart?username=${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.status === 'success') {
          setCartData(data.data);
        } else {
          throw new Error(data.message || 'Unknown error occurred');
        }
      } catch (error) {
        setError('Error fetching cart data: ' + error.message);
      }
    };

    fetchCart();
  }, [username]);

  // Calculate total price
  const totalPrice = cartData.reduce((total, item) => total + (item.price * item.quantity), 0);

  function gotofinalpage() {
    navigate('/adresspage'); 
  };

  return (
    <>
      <div className="bill-container">
        <h2 className="bill-title">Bill Details</h2>
        {error ? (
          <div className="bill-error">{error}</div>
        ) : (
          <div className="bill-content">
            <ul className="bill-items">
              {cartData.map((item, index) => (
                <li key={index} className="bill-item">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">₹{item.price.toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <div className="bill-total">
              <span>Total:</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
      <button className='blue-button' onClick={gotofinalpage}>LAST PAGE</button>
    </>
  );
};

export default BillFetch;

import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../usercontext';
import './cart.css'
import { useNavigate } from 'react-router-dom';

const CartFetcher = () => {
  const { username } = useContext(UserContext);
  const [cartData, setCartData] = useState([]);
  const [error, setError] = useState(null);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!username) {
          throw new Error('Username is not available');
        }

        console.log(username);
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

  if (error) {
    return <div className="error">Error: {error}</div>;
  }



  function changepage(){
    navigate('/billpage')
  }
  return (
    cartData.length>0 ?
    <div className="cart-container">
      <h2 className="cart-title">Cart Data</h2>
      <div className="cart-list-container">
        <ul className="cart-list">
          {cartData.map((product) => (
            <li key={product._id} className="cart-item">
              <div className="cart-item-content">
                <img
                  src={product.link}
                  alt={product.name}
                  className="cart-item-image"
                />
                <div>
                  <h3 className="cart-item-name">{product.name}</h3>
                  <p className="cart-item-price">Price: ₹{product.price?.toLocaleString() ?? 'N/A'}</p>
                  <p className="cart-item-type">Type: {product.product_type}</p>
                  <p className="cart-item-quantity">Quantity: {product.quantity}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="cart-payment-container">
        <button className="cart-payment-button" onClick={changepage}>PAYMENT</button>
      </div>
    </div>
  :<div className='flex fonto-bold'>There are no current products....</div>);
};

export default CartFetcher;

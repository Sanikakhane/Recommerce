import React, { useState, useEffect } from 'react';

const CartFetcher = () => {
  const [cartData, setCartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        // Use URL parameters for GET request instead of body
        const response = await fetch('http://localhost:8000/api/v1/getcart?username=sanika', {
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
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!cartData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Cart Data</h2>
      <ul>
        {cartData.map((product, index) => (
          <li key={index}>{JSON.stringify(product)}</li>
        ))}
      </ul>
    </div>
  );
};

export default CartFetcher;
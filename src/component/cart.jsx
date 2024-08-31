import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../usercontext';

const CartFetcher = () => {
  const { username } = useContext(UserContext); // Get the username from context
  const [cartData, setCartData] = useState([]);
  const [error, setError] = useState(null);

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
          setCartData(data.data); // Directly set the products data
        } else {
          throw new Error(data.message || 'Unknown error occurred');
        }
      } catch (error) {
        setError('Error fetching cart data: ' + error.message);
      }
    };

    fetchCart();
  }, [username]); // Depend on username so that it updates if username changes

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!cartData.length) {
    return <div className="text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-4  max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Cart Data</h2>
      <div className="overflow-y-auto max-h-80 border border-purple-400 p-4 rounded-lg">
        <ul className="space-y-4">
          {cartData.map((product) => (
            <li key={product._id} className="border-b border-gray-400 pb-4 mb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={product.link}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-gray-600">Price: ₹{product.price?.toLocaleString() ?? 'N/A'}</p>
                  <p className="text-gray-600">Type: {product.product_type}</p>
                  <p className="text-gray-600">Quantity: {product.quantity}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CartFetcher;

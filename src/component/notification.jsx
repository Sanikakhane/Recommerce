import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../usercontext'; // Ensure this path is correct

const Notification = () => {
  const [cartData, setCartData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [retrying, setRetrying] = useState(false);
  const [images, setImages] = useState({});
  const { username } = useContext(UserContext); // Get username from context

  const fetchCartData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/getcart?username=${username}`, 
        {
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

        // Fetch images for each product type
        const uniqueTypes = ["clothing","electronics","food"];
        console.log(uniqueTypes)
        uniqueTypes.forEach(type => fetchImage(type));
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

  const fetchImage = async (type) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/getimg/${type}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }

      const imgLink = await response;
      console.log(imgLink) // Assuming the API returns a URL as text
      setImages(prevImages => ({ ...prevImages, [type]: imgLink }));
    } catch (err) {
      console.error(`Failed to fetch image for type ${type}:`, err);
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
    <div className="p-4 max-w-4xl mx-auto">
      <div className='flex w-full h-32 justify-center items-around'>
        <div className='w-[50%] flex justify-center items-center text-bold'>
          <h1 className='text-center font-bold'>IF YOU LIKE THIS</h1>
        </div>
        <div className='w-[50%] flex justify-center items-center text-bold'>
          <h2 className='text-center font-bold'>YOU MIGHT ALSO LIKE THIS</h2>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {cartData.length > 0 ? (
        <ul>
          {cartData.map((item, index) => (
            <li key={index} className="border-b py-4">
              <div className="flex items-center bg-red-300">
                <img src={item.link} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                <div>
                  <h2 className="text-lg font-semibold">{item.productName}</h2>
                  <p className="text-gray-700">Price: ${item.price}</p>
                  {images[item.productType] && (
                    <div>
                      <img src={images[item.productType]} alt={item.productType} />
                      <p>{item.productType}</p>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in your cart.</p>
      )}
    </div>
  );
};

export default Notification;

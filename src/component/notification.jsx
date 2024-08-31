import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../usercontext'; // Ensure this path is correct

const Notification = () => {
  const [cartData, setCartData] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [productsWithImages, setProductsWithImages] = useState([]);
  const [error, setError] = useState(null);
  const { username } = useContext(UserContext); // Get username from context

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/getcart?username=Amol`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

       
       const data = await response.json();
       console.log(data)    
      }
    catch(err){
      setError(err.message);
    }
  
  }
  });






  return (
    <div className="p-4  max-w-4xl mx-auto">
   sdsd
      
    </div>
  );
  

}



export default Notification;

import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../usercontext';
import './buyproduct.css'


const ProductPage = () => {
  const { productname } = useParams(); // Get the product name from the URL
  const [product, setProduct] = React.useState(null);
  const { username } = useContext(UserContext); // Get the username from context

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/getproductbyname/${productname}`);
        const data = await response.json();
        setProduct(data.data);
        console.log(username);
        console.log(data.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productname]);

  // Function to handle the Add to Cart action
  const handleAddToCart = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/addtocart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          productname: product[0].name, // Assuming 'product.name' is the correct key for the product name
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Product added to cart:', result);
        alert('Product added to cart successfully!');
      } else {
        alert('Failed to add product to cart.');
        console.error('Error adding to cart:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('An error occurred while adding the product to cart.');
    }
  };

  if (!product) return <div className="text-center py-10 text-lg">Loading...</div>;

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg max-w-2xl">
      <div className="flex flex-col md:flex-row ml-8 items-center space-y-4 md:space-y-0 md:space-x-6">
        <img 
          src={product[0].link} 
          alt={product[0].name} 
          className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-md"
        />
        <div className="flex flex-col items-start md:items-center md:text-center">
          <h1 className="text-3xl font-semibold mb-2 text-gray-800">{product[0].name}</h1>
          <p className="text-xl text-gray-600 mb-4">${product[0].price}</p>
          <button
            className="bg-blue-500 text-white rounded-lg px-6 py-2 text-lg font-semibold transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

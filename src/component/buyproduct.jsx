import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../usercontext';

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
        console.log(username)
        console.log(data.data)
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
          productname: product.name, // Assuming 'product.name' is the correct key for the product name
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

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 bg-blue-300 w-[80vh] rounded-lg">
      <div className="flex flex-col items-center">
        <img src={product[0].link} alt={product[0].name} className="w-64 h-64 object-cover mb-4 rounded-lg" />
        <h1 className="text-2xl font-bold mb-2">{product[0].name}</h1>
        <p className="text-lg text-gray-700 mb-4">${product[0].price}</p>
        <button
          className="bg-blue-500 text-white rounded "
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;

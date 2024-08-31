import React, { useState } from 'react';
import './adresspage.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

export default function AddressPage() {
  const navigate = useNavigate(); // Correctly place the useNavigate hook here
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [error, setError] = useState('');

  const handlePlaceOrder = () => {
    if (!address || !phoneNumber || !paymentMethod) {
      setError('Please fill in all the fields and select a payment method.');
      return;
    }

    // Proceed with placing the order
    console.log('Order placed:', { address, phoneNumber, paymentMethod });
    navigate('/ordered'); // Navigate to the 'ordered' page
    // Add your order processing logic here
  };

  return (
    <div className="address-page-container">
      <h2>Shipping Details</h2>
      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="text"
          id="phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone number"
        />
      </div>

      <h3>Payment Method</h3>
      <div className="payment-methods">
        <div className="payment-option">
          <input
            type="radio"
            id="gpay"
            name="payment"
            value="GPay"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="gpay">
            <img src="./src/gpay.jpg" alt="GPay" />
            GPay
          </label>
        </div>
        <div className="payment-option">
          <input
            type="radio"
            id="phonepe"
            name="payment"
            value="PhonePe"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="phonepe">
            <img src="./src/phonpe.png" alt="PhonePe" />
            PhonePe
          </label>
        </div>
        <div className="payment-option">
          <input
            type="radio"
            id="cod"
            name="payment"
            value="Cash on Delivery"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="cod">
            <img src="./src/cod.png" alt="Cash on Delivery" />
            Cash on Delivery
          </label>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <button className="place-order-button" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
}

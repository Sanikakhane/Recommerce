import React from 'react';
import { useLocation } from 'react-router-dom';
// import './orderedpage.css'; // Optional CSS for styling

export default function OrderedPage() {
 // Get paymentMethod from the passed state

  return (
    <div className="ordered-page-container">
      <h2>Order Confirmed!</h2>
      <p>Your order has been placed successfully.</p>
      <p>
        <strong>Pay in selected payment Mode after the order reaches your destination.</strong>
      </p>
    </div>
  );
}

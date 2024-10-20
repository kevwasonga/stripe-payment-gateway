import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

// Import react stripe checkout
import StripeCheckout from 'react-stripe-checkout';

function App() {
  const [product] = useState({
    name: "React Seller",
    price: 10,
    productBy: "Verdo-Vendors"
  });

  const handleToken = (token) => {
    console.log(token); // You can send the token to your server to process the payment
    // Optionally, you can handle the response from your backend here
    alert("Payment Successful!"); // Notify the user of a successful payment
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          STRIPE GATEWAY
        </a>
        <StripeCheckout
              stripeKey={process.env.REACT_APP_STRIPE_KEY} // Use the environment variable
              token={handleToken}
              amount={product.price * 100}
              name={product.name}
              description={`Pay for ${product.productBy}`}
>

          <button className="btn-large pink">Buy Now</button> {/* Button for the checkout */}
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;

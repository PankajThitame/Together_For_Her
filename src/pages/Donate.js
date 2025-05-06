import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/donate.css";

const Donate = () => {
  const [customAmount, setCustomAmount] = useState("");

  // Handle Razorpay Payment
  const handleRazorpayDonate = async (amount) => {
    try {
      // Check if custom amount is selected
      if (amount === 0) {
        if (!customAmount || isNaN(customAmount) || customAmount <= 0) {
          alert("Please enter a valid amount.");
          return;
        }
        amount = parseInt(customAmount) * 100; // Convert to smallest currency unit (paise)
      }

      // Call backend to create Razorpay order
      const response = await axios.post("http://localhost:9090/api/payments/create", { amount });
      const { id: orderId, amount: razorAmount, currency } = response.data;

      const options = {
        key: "rzp_test_aRRY41tkiwfWbk", // Your Razorpay Key ID
        amount: razorAmount,
        currency: currency,
        order_id: orderId,
        name: "Together for Her",
        description: "Support Women's Safety",
        handler: function (response) {
          alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        },
        prefill: {
          name: "Supporter",
          email: "supporter@example.com",
          contact: "7821828016",
        },
        theme: {
          color: "#f25a70",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Error in Razorpay payment:", error);
      alert("Payment failed. Please try again!");
    }
  };

  return (
    <div className="donate-container">
      <div className="donate-card">
        <h2>💖 Support Our Cause</h2>
        <p>
          Your generosity helps us provide hygiene kits, education, and safety resources
          for women in need. Every contribution makes a difference!
        </p>

        {/* Donation Options */}
        <div className="donation-options">
          <h3>Choose an Amount</h3>
          <div className="donation-buttons">
            <button onClick={() => handleRazorpayDonate(500)}>Rs5</button>
            <button onClick={() => handleRazorpayDonate(1000)}>Rs10</button>
            <button onClick={() => handleRazorpayDonate(2000)}>Rs20</button>

            {/* Custom Amount Input */}
            <input
              type="number"
              placeholder="Enter custom amount"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
            />
            <button onClick={() => handleRazorpayDonate(0)}>Other</button>
          </div>
        </div>

        {/* Additional Links */}
        <div className="donate-links">
          <Link to="/fundraising" className="btn-secondary">Start a Fundraiser</Link>
          <Link to="/volunteer" className="btn-secondary">Become a Volunteer</Link>
          <Link to="/" className="btn-home">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Donate;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/fundManagement.css";

const FundManagement = () => {
  const [funds, setFunds] = useState({
    totalDonations: 0,
    recentDonors: [],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFundData = async () => {
      try {
        const response = await axios.get("http://localhost:9090/api/funds");
        setFunds(response.data);
      } catch (err) {
        setError("Error fetching fund data.");
        console.error(err);
      }
    };
    fetchFundData();
  }, []);

  return (
    <div className="fund-container">
      <h2>💰 Fund Management</h2>
      {error && <p className="error">{error}</p>}

      <div className="fund-card">
        <h3>Total Donations</h3>
        <p className="fund-amount">₹ {funds.totalDonations.toLocaleString()}</p>
      </div>

      <div className="recent-donors">
        <h3>Recent Donors</h3>
        {funds.recentDonors.length === 0 ? (
          <p>No recent donations.</p>
        ) : (
          <ul>
            {funds.recentDonors.map((donor, index) => (
              <li key={index}>
                <span>{donor.name}</span>
                <span>₹ {donor.amount.toLocaleString()}</span>
                <span>{new Date(donor.date).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FundManagement;

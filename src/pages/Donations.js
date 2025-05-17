import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/donate.css";

const Donations = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/donations").then((response) => {
      setDonations(response.data);
    });
  }, []);

  return (
    <div className="donation-container">
      <h2>Donation Management</h2>
      <table>
        <thead>
          <tr>
            <th>Donor Name</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation.id}>
              <td>{donation.donorName}</td>
              <td>{donation.email}</td>
              <td>₹{donation.amount}</td>
              <td>{new Date(donation.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Donations;

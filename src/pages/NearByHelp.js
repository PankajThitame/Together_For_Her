import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/nearByHelp.css";

const NearbyHelp = () => {
  const [helpers, setHelpers] = useState([]);

  useEffect(() => {
    fetchHelpers();
  }, []);

  const fetchHelpers = async () => {
    try {
      const response = await axios.get("http://localhost:9090/api/volunteers/");
      setHelpers(response.data);
    } catch (error) {
      console.error("Error fetching helpers:", error);
    }
  };

  const HelperCard = ({ helper }) => (
    <div className="helper-card">
      <h3>{helper.name}</h3>
      <p><strong>Role:</strong> {helper.type.replaceAll("_", " ")}</p>
      <p><strong>Contact:</strong> {helper.contactNumber}</p>
      <p><strong>Email:</strong> <a href={`mailto:${helper.email}`}>{helper.email}</a></p>
      {helper.contactNumber && (
        <p>
          <strong>WhatsApp:</strong>{" "}
          <a
            href={`https://wa.me/${helper.contactNumber}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Message on WhatsApp
          </a>
        </p>
      )}
    </div>
  );

  const filterByType = (type) => helpers.filter((h) => h.type === type);

  return (
    <div className="nearby-help-container">
      <h2>Nearby Help & Support</h2>

      <div className="helper-section">
        <h3>Available Doctors</h3>
        {filterByType("DOCTOR").length > 0 ? (
          filterByType("DOCTOR").map((helper) => (
            <HelperCard key={helper.id} helper={helper} />
          ))
        ) : (
          <p>No doctors available nearby.</p>
        )}
      </div>

      <div className="helper-section">
        <h3>Available Volunteers</h3>
        {helpers.filter((h) => h.type !== "DOCTOR").length > 0 ? (
          helpers
            .filter((h) => h.type !== "DOCTOR")
            .map((helper) => <HelperCard key={helper.id} helper={helper} />)
        ) : (
          <p>No volunteers available nearby.</p>
        )}
      </div>
    </div>
  );
};

export default NearbyHelp;

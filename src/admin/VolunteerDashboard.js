import React from "react";
import "../styles/volunteerDashboard.css";

const VolunteerDashboard = () => {
  const tasks = [
    { task: "Distribute Hygiene Kits", status: "Completed" },
    { task: "Conduct Awareness Session", status: "Pending" },
  ];

  return (
    <div className="container-volunteer">
      <h2>Volunteer Dashboard</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.task} - <strong>{task.status}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VolunteerDashboard;

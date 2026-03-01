import React from "react";

const VolunteerDashboard = () => {
  const tasks = [
    { task: "Distribute Hygiene Kits", status: "Completed" },
    { task: "Conduct Awareness Session", status: "Pending" },
  ];

  const getStatusStyles = (status) => {
    return status === "Completed"
      ? "bg-green-500 text-white"
      : "bg-orange-500 text-white";
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-center bg-pink-50 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
      <h2 className="text-pink-500 text-2xl font-bold mb-6 drop-shadow-md">
        Volunteer Dashboard
      </h2>
      <ul className="list-none p-0 space-y-4">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="bg-white px-4 py-3 rounded-md shadow-md flex justify-between items-center transition-transform duration-300 hover:scale-105 hover:bg-pink-100 text-lg"
          >
            <span>{task.task}</span>
            <strong
              className={`px-3 py-1 rounded-md text-sm ${getStatusStyles(
                task.status
              )}`}
            >
              {task.status}
            </strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VolunteerDashboard;

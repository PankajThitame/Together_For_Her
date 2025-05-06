import React from "react";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div>
      <Outlet /> {/* Renders child routes */}
    </div>
  );
};

export default PublicLayout;

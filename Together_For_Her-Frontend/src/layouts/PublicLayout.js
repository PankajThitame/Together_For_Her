import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer";

const PublicLayout = () => {
  return (
    <div className="animate-fadeIn w-full flex flex-col min-h-full">
      <div className="flex-1">
        <Outlet /> {/* Renders child routes */}
      </div>
      <Footer />
    </div>
  );
};

export default PublicLayout;

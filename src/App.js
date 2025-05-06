import React from "react";
import { useContext, useEffect } from "react";
import { AuthContext } from "./auth/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import Navbar from "./components/Navbar";
import SidePanel from "./components/SidePanel";
import RightSidePanel from "./components/RightSidePanel";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./auth/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Awareness from "./pages/Awareness";
import Donate from "./pages/Donate";
import VolunteerForm from "./pages/VolunteerForm";
import Feedback from "./pages/Feedback";
import Profile from "./pages/Profile";
import Community from "./pages/Community";
import Marketplace from "./pages/Marketplace";
import Newsletter from "./pages/Newsletter";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import RequestKit from "./pages/RequestKit";
import DonationSuccess from "./pages/DonationSuccess";
import ForumRules from "./pages/ForumRules";
import FAQAccordion from "./components/FAQAccordion";
import HygieneTips from "./components/HygieneTips";
import MotivationalQuotes from "./components/MotivationalQuotes";
import MythFactCard from "./components/MythFactCard";
import ThemeToggle from "./components/ThemeToggle";
import LoginForm from "./auth/LoginForm";
import Empowerment from "./pages/Empowerment";
import UserForm from "./layouts/UserForm";
import Donations from "./pages/Donations";
import SetPassword from "./layouts/SetPassword";
import UserContentUpload from "./components/UserContentUpload";
import UserProfile from "./layouts/UserProfile";

// Admin Features
import Users from "./admin/Users";
import RequestManagement from "./admin/RequestManagement";
import FundManagement from "./admin/FundManagement";
import Dashboard from "./admin/Dashboard";
import ContentModeration from "./admin/ContentModeration";
import AnalysisDashboard from "./admin/AnalysisDashboard";
import VolunteerManagement from "./admin/VolunteerManagement";
import FeedbackSystem from "./admin/FeedbackSystem";
import AddressMap from "./admin/AddressMap";
import AdminSidePanel from "./admin/AdminSidePanel";

import "./App.css";
import AdminNavbar from "./admin/AdminNavbar";
import UserManagement from "./admin/UserManagement";
import AdminAddProduct from "./admin/AdminAddProduct";
import NearbyHelp from "./pages/NearByHelp";

  const App = () => {
    const { user } = useAuth();
    const isAdmin = user?.role === "ADMIN";
      const { logout } = useContext(AuthContext);
    
      useEffect(() => {
        const token = localStorage.getItem("token");
        const handleUnload = () => {
          logout(); // This will clear context and local storage
          if (!token) {
            logout();
          }
        };
    
        window.addEventListener("beforeunload", handleUnload);
        return () => window.removeEventListener("beforeunload", handleUnload);
      }, [logout]);
    
  
    return (
      <Router>
        <div className="app-container">
          {!isAdmin && (
              <>
                <Navbar />
              </>
            )}
            {isAdmin && (
              <>
                <AdminNavbar/>
              </>
            )}
  
          <div className="main-layout">
            {/* ✅ Hide both SidePanels if the user is an admin */}
            {!isAdmin && (
              <>
                <SidePanel />
                <RightSidePanel />
              </>
            )}

            {isAdmin && (
              <>
                <AdminSidePanel />
                <RightSidePanel />
              </>
            )}
  
            <div className="main-app">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<PublicLayout />}>
                  <Route index element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="services" element={<Services />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="awareness" element={<Awareness />} />
                  <Route path="donate" element={<Donate />} />
                  <Route path="volunteer" element={<VolunteerForm />} />
                  <Route path="feedback" element={<Feedback />} />
                  <Route path="community" element={<Community />} />
                  <Route path="marketplace" element={<Marketplace />} />
                  <Route path="newsletter" element={<Newsletter />} />
                  <Route path="privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="terms" element={<Terms />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="success" element={<DonationSuccess />} />
                  <Route path="rules" element={<ForumRules />} />
                  <Route path="faq" element={<FAQAccordion />} />
                  <Route path="tips" element={<HygieneTips />} />
                  <Route path="quotes" element={<MotivationalQuotes />} />
                  <Route path="myth" element={<MythFactCard />} />
                  <Route path="toggle" element={<ThemeToggle />} />
                  <Route path="empowerment" element={<Empowerment />} />
                  <Route path="content" element={<UserContentUpload />} />
                  <Route path="nearbyhelp" element={<NearbyHelp />} />
                  <Route path="set-password" element={<SetPassword />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="sign-up" element={<UserForm />} />
                </Route>
  
                {/* Protected User Routes */}
                <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
                  <Route path="/request-kit" element={<RequestKit />} />
                  <Route path="/userprofile" element={<UserProfile />} />
                </Route>
  
                {/* Protected Admin Routes */}
                <Route
                  path="/admin/*"
                  element={<ProtectedRoute allowedRoles={["ADMIN"]} />}
                >
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="layout" element={<AdminLayout />} />
                  <Route path="donations" element={<Donations />} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="requests" element={<RequestManagement />} />
                  <Route path="address-map" element={<AddressMap />} />
                  <Route path="fund-management" element={<FundManagement />} />
                  <Route path="content-moderation" element={<ContentModeration />} />
                  {/* <Route path="analytics-dashboard" element={<AnalysisDashboard />} /> */}
                  <Route path="volunteer-management" element={<VolunteerManagement />} />
                  <Route path="feedback-system" element={<FeedbackSystem />} />
                  <Route path="add-product" element={<AdminAddProduct />} />
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    );
  };
  
  export default App;  

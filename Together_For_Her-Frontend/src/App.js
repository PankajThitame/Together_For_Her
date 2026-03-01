import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthContext, useAuth } from "./auth/AuthContext";

import Navbar from "./components/Navbar";
import SidePanel from "./components/SidePanel";
import RightSidePanel from "./components/RightSidePanel";
import Footer from "./components/footer";

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
import FAQ from "./pages/FAQ";
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
import ExperienceGallery from "./pages/ExperienceGallery";
import MyContributions from "./pages/MyContributions";
import VolunteerDashboard from "./volunteer/VolunteerDashboard";
import VolunteerOverview from "./volunteer/VolunteerOverview";
import NearbyRequests from "./volunteer/NearbyRequests";
import AssignedTasks from "./volunteer/AssignedTasks";
import KitDistribution from "./volunteer/KitDistribution";
import SupportCases from "./volunteer/SupportCases";
import Messages from "./volunteer/Messages";
import ImpactReport from "./volunteer/ImpactReport";
import Achievements from "./volunteer/Achievements";

import Users from "./admin/Users";
import RequestManagement from "./admin/RequestManagement";
import FundManagement from "./admin/FundManagement";
import Dashboard from "./admin/Dashboard";
import ContentModeration from "./admin/ContentModeration";
import VolunteerManagement from "./admin/VolunteerManagement";
import FeedbackSystem from "./admin/FeedbackSystem";
import AddressMap from "./admin/AddressMap";
import AdminSidePanel from "./admin/AdminSidePanel";
import AdminNavbar from "./admin/AdminNavbar";
import UserManagement from "./admin/UserManagement";
import AdminAddProduct from "./admin/AdminAddProduct";
import ManageContent from "./admin/ManageContent";
import NearbyHelp from "./pages/NearByHelp";

const AppContent = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const { logout } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const location = useLocation(); // Hook to get current path

  // Check if we are on a volunteer page
  const isVolunteerPage = location.pathname.startsWith("/volunteer");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const handleUnload = () => {
      if (!token) {
        logout();
      }
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [logout]);

  return (
    <div className={`flex flex-col h-screen overflow-hidden ${isVolunteerPage ? 'bg-white dark:bg-slate-900' : 'bg-[#fff1f5] dark:bg-[#0f172a]'} selection:bg-pink-100 selection:text-pink-600 transition-colors duration-300`}>
      {/* Unified Glass Navbar - Hide on Volunteer Pages */}
      {!isVolunteerPage && (
        <header className="flex-shrink-0 z-50">
          {!isAdmin ? <Navbar /> : <AdminNavbar />}
        </header>
      )}

      <div className="flex flex-1 overflow-hidden relative" style={isVolunteerPage ? {} : { gap: '32px' }}>
        {/* Main App Container */}
        <div className="flex flex-1 min-w-0">
          {/* Contextual Side Panels - Hide on Volunteer Pages */}
          {!isVolunteerPage && (
            <aside
              className="hidden md:block flex-shrink-0 z-[60] bg-transparent transition-all duration-500 ease-in-out"
              style={{ width: isAdmin ? 'auto' : (isSidebarOpen ? '250px' : '96px') }}
            >
              {!isAdmin ? (
                <SidePanel isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
              ) : (
                <AdminSidePanel isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
              )}
            </aside>
          )}

          <main className="flex-1 flex flex-col relative overflow-hidden bg-transparent transition-colors duration-300">
            <div className={`flex-1 overflow-y-auto overflow-x-hidden ${isVolunteerPage ? '' : 'px-10 py-8'} custom-scrollbar scroll-smooth`}>
              <div className={`${isVolunteerPage ? 'w-full h-full' : 'max-w-7xl mx-auto min-h-full'} overflow-x-hidden`}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<PublicLayout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="services" element={<Services />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="awareness" element={<Awareness />} />
                    <Route path="donate" element={<Donate />} />
                    <Route path="join-volunteer" element={<VolunteerForm />} />
                    <Route path="feedback" element={<Feedback />} />
                    <Route path="community" element={<Community />} />
                    <Route path="marketplace" element={<Marketplace />} />
                    <Route path="newsletter" element={<Newsletter />} />
                    <Route path="privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="terms" element={<Terms />} />
                    <Route path="terms" element={<Terms />} />
                    <Route path="success" element={<DonationSuccess />} />
                    <Route path="rules" element={<ForumRules />} />
                    <Route path="faq" element={<FAQ />} />
                    <Route path="tips" element={<HygieneTips />} />
                    <Route path="quotes" element={<MotivationalQuotes />} />
                    <Route path="myth" element={<MythFactCard />} />
                    <Route path="toggle" element={<ThemeToggle />} />
                    <Route path="empowerment" element={<Empowerment />} />
                    <Route path="content" element={<UserContentUpload />} />
                    <Route path="gallery" element={<ExperienceGallery />} />
                    <Route path="my-stories" element={<MyContributions />} />
                    <Route path="nearbyhelp" element={<NearbyHelp />} />
                    <Route path="set-password" element={<SetPassword />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="sign-up" element={<UserForm />} />
                  </Route>

                  {/* User & Admin Profile Route */}
                  <Route element={<ProtectedRoute allowedRoles={["USER", "ADMIN", "VOLUNTEER"]} />}>
                    <Route element={<PublicLayout />}>
                      <Route path="/profile" element={<Profile />} />
                    </Route>
                  </Route>

                  {/* Volunteer Routes */}
                  <Route path="/volunteer" element={<ProtectedRoute allowedRoles={["VOLUNTEER"]} />}>
                    <Route element={<VolunteerDashboard />}>
                      <Route path="dashboard" element={<VolunteerOverview />} />
                      <Route path="requests" element={<NearbyRequests />} />
                      <Route path="tasks" element={<AssignedTasks />} />
                      <Route path="kits" element={<KitDistribution />} />
                      <Route path="support" element={<SupportCases />} />
                      <Route path="messages" element={<Messages />} />
                      <Route path="impact" element={<ImpactReport />} />
                      <Route path="achievements" element={<Achievements />} />
                      {/* Add other volunteer sub-routes here later */}
                      <Route index element={<VolunteerOverview />} />
                    </Route>
                  </Route>

                  {/* User Protected Routes */}
                  <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
                    <Route element={<PublicLayout />}>
                      <Route path="/request-kit" element={<RequestKit />} />
                    </Route>
                  </Route>

                  {/* Admin Protected Routes */}
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
                    <Route path="manage-content" element={<ManageContent />} />
                    <Route path="volunteer-management" element={<VolunteerManagement />} />
                    <Route path="feedback-system" element={<FeedbackSystem />} />
                    <Route path="add-product" element={<AdminAddProduct />} />
                  </Route>
                </Routes>
              </div>
            </div>
          </main>
        </div>

        {/* Right Insights Sidebar - Hide on Volunteer Pages */}
        {!isAdmin && !isVolunteerPage && (
          <aside className="hidden lg:block w-[320px] flex-shrink-0 z-30 bg-white/10 dark:bg-slate-900/10 backdrop-blur-3xl overflow-hidden border-l border-white/20 dark:border-slate-800/20">
            <div className="h-full px-6 py-8 overflow-y-auto custom-scrollbar">
              <RightSidePanel />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;

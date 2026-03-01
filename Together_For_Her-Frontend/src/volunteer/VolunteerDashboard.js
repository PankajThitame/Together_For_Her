import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import VolunteerSidebar from "./VolunteerSidebar";
import VolunteerNavbar from "./VolunteerNavbar";

const VolunteerDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-[#fff1f5] dark:bg-[#0f172a] overflow-hidden selection:bg-pink-100 selection:text-pink-600">
            {/* Sidebar */}
            <aside className="shrink-0 z-50 transition-all duration-300 ease-in-out">
                <VolunteerSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col relative overflow-hidden">
                <VolunteerNavbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setIsSidebarOpen} />

                {/* Content */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-10 custom-scrollbar scroll-smooth">
                    <div className="max-w-[1400px] mx-auto min-h-full">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default VolunteerDashboard;

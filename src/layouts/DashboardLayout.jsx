
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import FloatingFeedbackButton from "@/components/FloatingFeedbackButton";

const DashboardLayout = ({ userType }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        userType={userType} 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          userType={userType}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Only show the floating feedback button for farmer/user dashboard */}
      {userType === "farmer" && <FloatingFeedbackButton />}
    </div>
  );
};

export default DashboardLayout;

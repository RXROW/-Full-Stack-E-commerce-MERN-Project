import React, { useState } from "react";
import Sidebar from "./AdminSideBar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen"> 
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
 
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

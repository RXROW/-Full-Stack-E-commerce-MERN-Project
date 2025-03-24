import React from "react";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer"; 
import Home from "../../pages/Home";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      {/* Header */}
      <Header />
      {/* MainContent */}
      <main>
      <Outlet/>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UserLayout;

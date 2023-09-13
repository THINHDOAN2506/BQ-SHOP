import React from "react";
import Sidebar from "../components/SideBar";
import "./style.scss";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Supports from "../components/Supports";
import useScrollToTop from "../hooks/useScrollToTop";

const MainLayout = () => {
  useScrollToTop();
  return (
    <div className="mainlayout-container">
      <Sidebar />
      <div className="mainlayout-container__content">
        <Outlet />
      </div>
      <Supports />
      <Footer />
    </div>
  );
};

export default MainLayout;

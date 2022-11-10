import React from 'react';
import { useNavigate } from 'react-router-dom'; 
// import withAuth from "../../core/withAuth";
import SideBar from "../sideBar/sidebar.js";
import PageContainer from "../pageContainer/innerPageBody.js";

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.log(token);
    return navigate("/");
  }
  return (
    <div className="dashboardUi">
      <SideBar/>
      <PageContainer/>
    </div>
  )
}
export default Dashboard;
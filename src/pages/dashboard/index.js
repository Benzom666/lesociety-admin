import React, { useState, useEffect } from 'react';
// import withAuth from "../../core/withAuth";
import SideBar from "../sideBar/sidebar.js";
import PageContainer from "../pageContainer/innerPageBody.js";

const dashboard = () => {

  return (
    <div className="dashboardUi">
       <input type="text" />
      <SideBar/>
      <PageContainer/>
    </div>
  )
}
export default dashboard;
import React from 'react';
// import withAuth from "../../core/withAuth";
import SideBar from "../sideBar/sidebar.js";
import PageContainer from "../pageContainer/innerPageBody.js";

const dashboard = props => {

  return (
    <div className="dashboardUi">
      <SideBar/>
      <PageContainer/>
    </div>
  )
}
export default dashboard;
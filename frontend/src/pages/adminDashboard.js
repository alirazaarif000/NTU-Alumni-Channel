import React from 'react';
import Main from '../components/adminDashboard/main/Main';
import Sidebar from "../components/adminDashboard/sidebar/Sidebar";
import { useState } from 'react';


const AdminDashboard = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="admin-panel">
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
      <Main showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
    </div>
  );
}

export default AdminDashboard;

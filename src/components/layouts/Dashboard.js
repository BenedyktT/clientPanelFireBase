import React from "react";
import Clients from "../clients/Clients";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="dashboard-wrapper">
        <div className="column column-clients">
          <Clients />
        </div>
        <div className="column column-sidebar">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

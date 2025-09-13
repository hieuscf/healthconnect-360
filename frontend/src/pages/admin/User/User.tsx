import React from "react";
import { OverviewDashboard } from "../../../widgets/OverviewDashBoard/ui/OverviewDashboard";
import { UsersTable } from "../../../widgets/user-table/ui/UsersTable";

const DashBoard = () => {
  return (
    <div>
      <OverviewDashboard />
      <UsersTable />
    </div>
  );
};

export default DashBoard;

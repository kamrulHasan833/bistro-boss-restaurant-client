import { Outlet, useLocation } from "react-router-dom";
import SidebarDashboard from "../Components/Layouts/SidebarDashboard";
const Dashboard = () => {
  const { pathname } = useLocation();
  return (
    <div
      className={`xl:flex ${
        pathname === "/dashboard/add-item" ||
        pathname === "dashboard/update-item"
          ? "bg-white "
          : "bg-dashboard-bg "
      } min-h-screen`}
    >
      <div>
        <SidebarDashboard />
      </div>
      <div className="flex-grow ">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

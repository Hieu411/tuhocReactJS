import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <Outlet />
    </div>
  );
};

export default AdminLayout;

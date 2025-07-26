import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Simple auth check (for demo)
  React.useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
        <div className="space-y-4">
          <Link to="/admin/users" className="block w-full bg-primary text-white py-3 rounded font-semibold hover:bg-primary/90 transition">Manage Users</Link>
          <Link to="/admin/products" className="block w-full bg-primary text-white py-3 rounded font-semibold hover:bg-primary/90 transition">Manage Products</Link>
          <Link to="/admin/orders" className="block w-full bg-primary text-white py-3 rounded font-semibold hover:bg-primary/90 transition">Manage Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 
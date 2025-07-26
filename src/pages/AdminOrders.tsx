import React, { useEffect, useState } from "react";
import { API_BASE } from "../lib/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE}/admin/orders`, {
          headers: {
            'x-admin-token': localStorage.getItem('admin_token') || ''
          }
        });
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-6">All Orders</h2>
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {!loading && !error && (
          <table className="w-full border">
            <thead>
              <tr className="bg-muted">
                <th className="p-2 text-left">Order #</th>
                <th className="p-2 text-left">User</th>
                <th className="p-2 text-left">Total</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id} className="border-t">
                  <td className="p-2 font-semibold">{order.orderNumber}</td>
                  <td className="p-2">{order.user ? order.user.name : 'N/A'}</td>
                  <td className="p-2">${order.total.toFixed(2)}</td>
                  <td className="p-2 capitalize">{order.status}</td>
                  <td className="p-2">{new Date(order.orderDate).toLocaleString()}</td>
                  <td className="p-2">{order.items.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminOrders; 
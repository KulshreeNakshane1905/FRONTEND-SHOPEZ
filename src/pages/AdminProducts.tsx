import React, { useEffect, useState } from "react";
import { API_BASE } from "../lib/api";

const emptyProduct = {
  title: '',
  price: '',
  image: '',
  category: '',
  description: '',
  rating: { rate: 0, count: 0 }
};

const AdminProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formProduct, setFormProduct] = useState<any>(emptyProduct);
  const [editId, setEditId] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/admin/products`, {
        headers: { 'x-admin-token': localStorage.getItem('admin_token') || '' }
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this product?')) return;
    setFormLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/products/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': localStorage.getItem('admin_token') || '' }
      });
      if (!res.ok) throw new Error('Delete failed');
      await fetchProducts();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (product: any) => {
    setEditId(product._id);
    setFormProduct({ ...product, price: product.price.toString() });
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditId(null);
    setFormProduct(emptyProduct);
    setShowForm(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormProduct((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const payload = {
        ...formProduct,
        price: parseFloat(formProduct.price),
        rating: { rate: Number(formProduct.rating?.rate) || 0, count: Number(formProduct.rating?.count) || 0 }
      };
      let res;
      if (editId) {
        res = await fetch(`${API_BASE}/admin/products/${editId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-token': localStorage.getItem('admin_token') || ''
          },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch(`${API_BASE}/admin/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-token': localStorage.getItem('admin_token') || ''
          },
          body: JSON.stringify(payload)
        });
      }
      if (!res.ok) throw new Error('Save failed');
      setShowForm(false);
      await fetchProducts();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto bg-white rounded shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">All Products</h2>
          <button className="bg-primary text-white px-4 py-2 rounded font-semibold" onClick={handleAdd}>Add Product</button>
        </div>
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {!loading && !error && (
          <table className="w-full border mb-8">
            <thead>
              <tr className="bg-muted">
                <th className="p-2 text-left">Title</th>
                <th className="p-2 text-left">Price</th>
                <th className="p-2 text-left">Category</th>
                <th className="p-2 text-left">Image</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id} className="border-t">
                  <td className="p-2">{product.title}</td>
                  <td className="p-2">${product.price}</td>
                  <td className="p-2">{product.category}</td>
                  <td className="p-2"><img src={product.image} alt={product.title} className="h-10 w-10 object-cover rounded" /></td>
                  <td className="p-2">
                    <button className="text-blue-600 mr-2" onClick={() => handleEdit(product)}>Edit</button>
                    <button className="text-red-600" onClick={() => handleDelete(product._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {showForm && (
          <form onSubmit={handleFormSubmit} className="bg-muted p-4 rounded mb-4">
            <h3 className="text-lg font-semibold mb-4">{editId ? 'Edit Product' : 'Add Product'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Title</label>
                <input name="title" value={formProduct.title} onChange={handleFormChange} className="w-full border rounded px-2 py-1" required />
              </div>
              <div>
                <label className="block mb-1">Price</label>
                <input name="price" value={formProduct.price} onChange={handleFormChange} className="w-full border rounded px-2 py-1" required type="number" step="0.01" />
              </div>
              <div>
                <label className="block mb-1">Category</label>
                <input name="category" value={formProduct.category} onChange={handleFormChange} className="w-full border rounded px-2 py-1" required />
              </div>
              <div>
                <label className="block mb-1">Image URL</label>
                <input name="image" value={formProduct.image} onChange={handleFormChange} className="w-full border rounded px-2 py-1" required />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1">Description</label>
                <textarea name="description" value={formProduct.description} onChange={handleFormChange} className="w-full border rounded px-2 py-1" required />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded font-semibold" disabled={formLoading}>{formLoading ? 'Saving...' : 'Save'}</button>
              <button type="button" className="bg-gray-300 px-4 py-2 rounded font-semibold" onClick={() => setShowForm(false)} disabled={formLoading}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminProducts; 
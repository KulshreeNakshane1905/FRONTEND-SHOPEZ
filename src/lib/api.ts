export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function registerUser({ name, email, password }: { name: string, email: string, password: string }) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Registration failed');
  return res.json();
}

export async function loginUser({ email, password }: { email: string, password: string }) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Login failed');
  return res.json();
}

// Product APIs
export async function getProducts() {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function getProduct(id: string) {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

export async function getProductsByCategory(category: string) {
  const res = await fetch(`${API_BASE}/products/category/${category}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

// Order APIs
export async function createOrder(orderData: any) {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Failed to create order');
  return res.json();
}

export async function getUserOrders(userId: string) {
  const res = await fetch(`${API_BASE}/orders/user/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}

export async function getOrder(orderId: string) {
  const res = await fetch(`${API_BASE}/orders/${orderId}`);
  if (!res.ok) throw new Error('Failed to fetch order');
  return res.json();
} 
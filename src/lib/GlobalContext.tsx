import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getProducts } from './api';

// Types
export interface Product {
  _id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  description: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  // Add more fields as needed
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Order {
  _id: string;
  orderNumber: string;
  orderDate: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: CartItem[];
  total: number;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
}

interface GlobalContextType {
  products: Product[];
  loading: boolean;
  user: User | null;
  favorites: string[];
  cart: CartItem[];
  orders: Order[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  setUser: (user: User | null) => void;
  addFavorite: (productId: string) => void;
  removeFavorite: (productId: string) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addOrder: (order: Order) => void;
  getOrder: (orderId: string) => Order | undefined;
  setProducts: (products: Product[]) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error('useGlobalContext must be used within GlobalProvider');
  return context;
};

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addFavorite = (productId: string) => {
    setFavorites((prev) => (prev.includes(productId) ? prev : [...prev, productId]));
  };

  const removeFavorite = (productId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== productId));
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existingItem = prev.find(item => item.id === product._id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, {
          id: product._id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: quantity
        }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart((prev) =>
        prev.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const getOrder = (orderId: string) => {
    return orders.find(order => order._id === orderId);
  };

  return (
    <GlobalContext.Provider
      value={{
        products,
        loading,
        user,
        favorites,
        cart,
        orders,
        selectedCategory,
        setSelectedCategory,
        setUser,
        addFavorite,
        removeFavorite,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addOrder,
        getOrder,
        setProducts,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}; 
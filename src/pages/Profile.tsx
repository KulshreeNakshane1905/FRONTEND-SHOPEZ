import React from "react";
import { useGlobalContext } from "@/lib/GlobalContext";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Heart, ShoppingCart, Package, LogOut } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { user, favorites, products, setUser } = useGlobalContext();
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-hero text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <User className="h-8 w-8" />
            <h1 className="text-4xl font-bold">My Profile</h1>
          </div>
          <p className="text-xl text-blue-100">
            Manage your account and preferences
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          {user ? (
            <div className="space-y-6">
              {/* User Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Account Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-semibold">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-semibold">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-4">
                    <Button variant="outline" size="sm">
                      Edit Profile
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Heart className="h-8 w-8 text-red-500" />
                      <div>
                        <p className="text-2xl font-bold">{favorites.length}</p>
                        <p className="text-sm text-muted-foreground">Favorites</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <ShoppingCart className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="text-2xl font-bold">0</p>
                        <p className="text-sm text-muted-foreground">Cart Items</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Package className="h-8 w-8 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold">0</p>
                        <p className="text-sm text-muted-foreground">Orders</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
          </div>

              {/* Favorites Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    My Favorites ({favoriteProducts.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
        {favoriteProducts.length === 0 ? (
                    <div className="text-center py-8">
                      <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">
                        You haven't added any favorites yet.
                      </p>
                      <Link to="/products">
                        <Button variant="outline">
                          Explore Products
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {favoriteProducts.slice(0, 4).map((product) => (
              <ProductCard
                          key={product._id}
                          id={product._id}
                name={product.title}
                price={product.price}
                image={product.image}
                rating={product.rating.rate}
                reviews={product.rating.count}
              />
            ))}
                    </div>
                  )}
                  {favoriteProducts.length > 4 && (
                    <div className="mt-4 text-center">
                      <Link to="/favorites">
                        <Button variant="outline">
                          View All Favorites
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center py-16">
              <User className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Please log in</h2>
              <p className="text-muted-foreground mb-8">
                You need to be logged in to view your profile.
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/login">
                  <Button variant="gradient">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline">
                    Register
                  </Button>
                </Link>
              </div>
          </div>
        )}
      </div>
      </section>
    </div>
  );
};

export default Profile; 
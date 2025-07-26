import React from "react";
import { useGlobalContext } from "@/lib/GlobalContext";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Trash2, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favorites, products, removeFavorite, addToCart } = useGlobalContext();
  const favoriteProducts = products.filter((p) => favorites.includes(p._id));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-hero text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Heart className="h-8 w-8" />
            <h1 className="text-4xl font-bold">My Favorites</h1>
          </div>
          <p className="text-xl text-blue-100">
            Your saved products and wishlist items
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          {favoriteProducts.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">No favorites yet</h2>
              <p className="text-muted-foreground mb-8">
                You haven't added any products to your favorites yet. Start exploring to find products you love!
              </p>
              <Link to="/products">
                <Button variant="gradient" size="lg">
                  Explore Products
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Header with count */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Favorites ({favoriteProducts.length})</h2>
                  <p className="text-muted-foreground">
                    Products you've saved for later
                  </p>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {favoriteProducts.length} item{favoriteProducts.length !== 1 ? 's' : ''}
                </Badge>
              </div>

              {/* Favorites Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoriteProducts.map((product) => (
                  <Card key={product._id} className="group overflow-hidden border-0 shadow-md hover:shadow-glow transition-all duration-300 bg-white">
                    {/* Product Image */}
                    <div className="relative overflow-hidden aspect-square">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Remove from Favorites Button */}
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={() => removeFavorite(product._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <CardContent className="p-4">
                      {/* Product Title */}
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-foreground">
                        {product.title}
                      </h3>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating.rate)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground ml-1">
                          ({product.rating.count})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-primary">
                          ${product.price}
                        </span>
                        <Badge variant="outline" className="capitalize">
                          {product.category}
                        </Badge>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button 
                          variant="gradient" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => addToCart(product, 1)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Link to={`/products/${product._id}`}>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Empty state when all items are removed */}
              {favoriteProducts.length === 0 && (
                <div className="text-center py-16">
                  <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-4">All favorites removed</h2>
                  <p className="text-muted-foreground mb-8">
                    You've removed all your favorite products. Start exploring to find new favorites!
                  </p>
                  <Link to="/products">
                    <Button variant="gradient" size="lg">
                      Explore Products
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Favorites; 
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "@/lib/GlobalContext";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
}

const ProductCard = ({ 
  id,
  name, 
  price, 
  originalPrice, 
  image, 
  rating, 
  reviews, 
  badge 
}: ProductCardProps) => {
  const { favorites, addFavorite, removeFavorite, addToCart, products } = useGlobalContext();
  const productId = id;
  const isFavorite = favorites.includes(productId);
  const product = products.find(p => p._id === productId);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(productId);
    } else {
      addFavorite(productId);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product) {
      addToCart(product, 1);
    }
  };

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Card className="relative group overflow-hidden border-0 shadow-md hover:shadow-glow transition-all duration-300 bg-white">
      {/* Favorite Heart Icon */}
      <button
        onClick={handleFavorite}
        className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white/80 hover:bg-white shadow"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart className={isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"} />
      </button>
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-square">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Badge */}
          {badge && (
            <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-semibold">
              {badge}
            </div>
          )}
          
          {/* Discount */}
          {discount > 0 && (
            <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-xs font-semibold">
              -{discount}%
            </div>
          )}

          {/* Quick Action Overlay */}
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button variant="shop" className="w-full" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-foreground">
            {name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-1">
              ({reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">
                ${price}
              </span>
              {originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${originalPrice}
                </span>
              )}
            </div>
            <Link to={`/products/${id}`}>
              <Button variant="outline" size="sm">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
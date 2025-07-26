import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import headphonesImage from "@/assets/product-headphones.jpg";
import smartphoneImage from "@/assets/product-smartphone.jpg";
import watchImage from "@/assets/product-watch.jpg";
import laptopImage from "@/assets/product-laptop.jpg";

const FeaturedProducts = () => {
  const featuredProducts = [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 199,
      originalPrice: 249,
      image: headphonesImage,
      rating: 4.8,
      reviews: 124,
      badge: "Best Seller"
    },
    {
      id: "2",
      name: "Latest Smartphone Pro",
      price: 899,
      originalPrice: 999,
      image: smartphoneImage,
      rating: 4.9,
      reviews: 89,
      badge: "New"
    },
    {
      id: "3",
      name: "Luxury Classic Watch",
      price: 299,
      image: watchImage,
      rating: 4.7,
      reviews: 67,
    },
    {
      id: "4",
      name: "Ultra-Thin Laptop",
      price: 1299,
      originalPrice: 1499,
      image: laptopImage,
      rating: 4.6,
      reviews: 203,
      badge: "Popular"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium products, 
            curated for quality and customer satisfaction
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="gradient" size="lg" className="px-8">
            View All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
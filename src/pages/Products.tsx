import Header from "@/components/Header";
import FeaturedProducts from "@/components/FeaturedProducts";
import Categories from "@/components/Categories";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, SortAsc } from "lucide-react";
import { useState, useEffect } from "react";
import { useGlobalContext } from "@/lib/GlobalContext";
import ProductCard from "@/components/ProductCard";
import { Link, useParams } from "react-router-dom";

// Helper to convert slug to category name
const fromCategorySlug = (slug: string, categories: string[]) => {
  const normalized = slug.replace(/-/g, ' ').replace(/and/g, '&');
  // Find the category that matches ignoring case and spaces
  return categories.find(cat => cat.toLowerCase().replace(/\s+/g, ' ').trim() === normalized.trim()) || slug;
};

const Products = () => {
  const { products, loading, setProducts, selectedCategory, setSelectedCategory } = useGlobalContext();
  const { categoryName } = useParams();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Extract unique categories from products
    const uniqueCategories = Array.from(
      new Set(products.map((product) => product.category))
    ) as string[];
    setCategories(uniqueCategories);
  }, [products]);

  useEffect(() => {
    if (categoryName && categories.length > 0) {
      const realCategory = fromCategorySlug(categoryName, categories);
      setSelectedCategory(realCategory);
    } else if (!categoryName) {
      setSelectedCategory('all');
    }
  }, [categoryName, setSelectedCategory, categories]);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-hero text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">All Products</h1>
          <p className="text-xl text-blue-100">
            Discover our complete collection of amazing products
          </p>
        </div>
      </section>

      {/* Filters & Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Filter Bar */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4">
                  <Filter className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Filter by category:</span>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant={selectedCategory === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory('all')}
                    >
                      All Products
                    </Button>
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className="capitalize"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <SortAsc className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {filteredProducts.length} products found
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add this above the products grid */}
          <div className="mb-6 text-right">
            <Link to="/favorites" className="text-primary underline font-medium">View Favorites</Link>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-muted"></div>
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-6 bg-muted rounded w-1/2"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
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
        </div>
      </section>
    </div>
  );
};

export default Products;
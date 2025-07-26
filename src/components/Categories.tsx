import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Smartphone, 
  Headphones, 
  Laptop, 
  Watch, 
  ShirtIcon as Fashion, 
  Home,
  Gamepad2,
  Camera
} from "lucide-react";
import { useGlobalContext } from "@/lib/GlobalContext";
import { useNavigate } from "react-router-dom";

// Helper to convert category name to URL slug
const toCategorySlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');

const Categories = () => {
  const { setSelectedCategory } = useGlobalContext();
  const navigate = useNavigate();
  const categories = [
    {
      icon: Smartphone,
      name: "Electronics",
      count: "1,200+ items",
      color: "text-blue-500"
    },
    {
      icon: Fashion,
      name: "Fashion",
      count: "800+ items", 
      color: "text-pink-500"
    },
    {
      icon: Home,
      name: "Home & Garden",
      count: "950+ items",
      color: "text-green-500"
    },
    {
      icon: Gamepad2,
      name: "Gaming",
      count: "600+ items",
      color: "text-purple-500"
    },
    {
      icon: Camera,
      name: "Photography",
      count: "450+ items",
      color: "text-orange-500"
    },
    {
      icon: Watch,
      name: "Accessories",
      count: "750+ items",
      color: "text-indigo-500"
    },
    {
      icon: Headphones,
      name: "Audio",
      count: "350+ items",
      color: "text-red-500"
    },
    {
      icon: Laptop,
      name: "Computing",
      count: "500+ items",
      color: "text-cyan-500"
    }
  ];

  // Add 'All' category at the start
  const allCategories = [
    {
      icon: null,
      name: "All",
      count: "All items",
      color: "text-gray-400",
      bg: "bg-gradient-to-br from-gray-200 to-gray-100"
    },
    ...categories.map(cat => ({ ...cat, bg: `bg-gradient-to-br from-white to-gray-50` }))
  ];

  const handleCategoryClick = (name: string) => {
    if (name === "All") {
      navigate("/products");
    } else {
      navigate(`/products/category/${toCategorySlug(name)}`);
    }
  };

  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse range of categories and find exactly what you're looking for
          </p>
        </div>
        {/* Horizontal Scrollable Categories */}
        <div className="flex space-x-4 overflow-x-auto py-4 px-2 scrollbar-thin scrollbar-thumb-muted/40 scrollbar-track-transparent">
          {allCategories.map((category, index) => {
            const IconComponent = category.icon;
            const isAll = category.name === "All";
            return (
              <div
                key={index}
                className={`flex flex-col items-center cursor-pointer group min-w-[90px] select-none ${isAll ? 'ring-2 ring-primary/60 bg-primary/5' : ''}`}
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 shadow group-hover:shadow-lg transition bg-white ${isAll ? 'border-2 border-primary' : ''}`}>
                  {IconComponent ? (
                    <IconComponent className={`h-8 w-8 ${category.color} group-hover:scale-110 transition-transform duration-300`} />
                  ) : (
                    <span className="text-2xl font-bold text-primary">★</span>
                  )}
                </div>
                <span className={`text-sm font-medium text-center group-hover:text-primary ${isAll ? 'text-primary' : 'text-foreground'}`}>{category.name}</span>
                <span className={`text-xs mt-1 text-muted-foreground`}>{category.count}</span>
              </div>
            );
          })}
        </div>
        {/* Browse All Button */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg" className="px-8" onClick={() => { setSelectedCategory('all'); navigate('/products'); }}>
            Browse All Categories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
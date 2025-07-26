import { ShoppingCart, Search, User, Menu, Heart, Package, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "@/lib/GlobalContext";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setProducts, products, cart, user, setUser } = useGlobalContext();
  const [search, setSearch] = useState("");
  
  const isActive = (path: string) => location.pathname === path;
  const isAdmin = !!localStorage.getItem("admin_token");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim() === "") return;
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    setProducts(filtered);
    navigate("/products");
  };

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              ShopEZ
            </span>
          </Link>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`font-medium transition-colors ${
                isActive('/products') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Products
            </Link>
            <Link 
              to="/cart" 
              className={`font-medium transition-colors ${
                isActive('/cart') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Cart
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search for products..."
                  className="pl-10 pr-4 h-12 rounded-full border-2 border-muted focus:border-primary transition-colors"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center gap-2">
            <Link to="/favorites">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/orders">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Package className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/profile">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <UserIcon className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                    {cart.length}
                  </span>
                )}
              </Button>
            </Link>

            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden md:block">
                  Welcome, {user.name}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="hidden md:flex"
                  onClick={() => {
                    setUser(null);
                    navigate('/');
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="hidden md:flex">
                  Login
                </Button>
              </Link>
            )}

            {!isAdmin && (
              <Link to="/admin/login">
                <Button variant="outline" size="sm">
                  Admin Login
                </Button>
              </Link>
            )}

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex items-center justify-around border-t pt-4">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors ${
              isActive('/') ? 'text-primary' : 'text-foreground hover:text-primary'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={`text-sm font-medium transition-colors ${
              isActive('/products') ? 'text-primary' : 'text-foreground hover:text-primary'
            }`}
          >
            Products
          </Link>
          <Link 
            to="/orders" 
            className={`text-sm font-medium transition-colors ${
              isActive('/orders') ? 'text-primary' : 'text-foreground hover:text-primary'
            }`}
          >
            Orders
          </Link>
          <Link 
            to="/cart" 
            className={`text-sm font-medium transition-colors ${
              isActive('/cart') ? 'text-primary' : 'text-foreground hover:text-primary'
            }`}
          >
            Cart
          </Link>
          {user ? (
            <button 
              className={`text-sm font-medium transition-colors ${
                'text-foreground hover:text-primary'
              }`}
              onClick={() => {
                setUser(null);
                navigate('/');
              }}
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/login" 
              className={`text-sm font-medium transition-colors ${
                isActive('/login') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
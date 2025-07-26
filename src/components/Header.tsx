import { ShoppingCart, Search, User, Menu, Heart, Package, User as UserIcon, X } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              ShopEZ
            </span>
          </Link>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-6">
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

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearch} className="w-full">
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

          {/* Navigation Actions - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/favorites">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/orders">
              <Button variant="ghost" size="icon">
                <Package className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/profile">
              <Button variant="ghost" size="icon">
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
                <span className="text-sm text-muted-foreground hidden lg:block">
                  Welcome, {user.name}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
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
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
            )}

            {!isAdmin && (
              <Link to="/admin/login">
                <Button variant="outline" size="sm">
                  Admin
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
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
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mt-4">
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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 border-t pt-4">
            <nav className="space-y-4">
              <Link 
                to="/" 
                className={`block py-2 font-medium transition-colors ${
                  isActive('/') ? 'text-primary' : 'text-foreground hover:text-primary'
                }`}
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className={`block py-2 font-medium transition-colors ${
                  isActive('/products') ? 'text-primary' : 'text-foreground hover:text-primary'
                }`}
                onClick={closeMobileMenu}
              >
                Products
              </Link>
              <Link 
                to="/favorites" 
                className="block py-2 font-medium text-foreground hover:text-primary"
                onClick={closeMobileMenu}
              >
                Favorites
              </Link>
              <Link 
                to="/orders" 
                className="block py-2 font-medium text-foreground hover:text-primary"
                onClick={closeMobileMenu}
              >
                Orders
              </Link>
              <Link 
                to="/profile" 
                className="block py-2 font-medium text-foreground hover:text-primary"
                onClick={closeMobileMenu}
              >
                Profile
              </Link>
              
              <div className="pt-2 border-t">
                {user ? (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground py-2">
                      Welcome, {user.name}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        setUser(null);
                        navigate('/');
                        closeMobileMenu();
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Link to="/login" onClick={closeMobileMenu}>
                    <Button variant="outline" size="sm" className="w-full">
                      Login
                    </Button>
                  </Link>
                )}
                
                {!isAdmin && (
                  <Link to="/admin/login" onClick={closeMobileMenu}>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      Admin Login
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
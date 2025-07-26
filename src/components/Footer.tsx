import { Facebook, Twitter, Instagram, Phone, Mail, MapPin, Shield, Truck, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-lg">S</span>
              </div>
              <span className="text-2xl font-bold">ShopEZ</span>
            </div>
            <p className="text-blue-100 mb-4 leading-relaxed">
              Your trusted partner for effortless online shopping. 
              Discover quality products with secure payments and fast delivery.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['About Us', 'Contact', 'FAQ', 'Shipping Info', 'Returns', 'Privacy Policy'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-200" />
                <span className="text-blue-100">8459694332</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-200" />
                <span className="text-blue-100">kulshreenakshane@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-200" />
                <span className="text-blue-100">Pune</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-blue-100 mb-4">
              Subscribe to get special offers and updates
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-blue-200"
              />
              <Button variant="secondary" size="sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-white/20" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-blue-100 text-sm">
            © {new Date().getFullYear()} ShopEZ. All rights reserved.
          </p>

          {/* Trust Badges */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-200" />
              <span className="text-blue-100 text-sm">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-blue-200" />
              <span className="text-blue-100 text-sm">Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-blue-200" />
              <span className="text-blue-100 text-sm">All Payment Methods</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
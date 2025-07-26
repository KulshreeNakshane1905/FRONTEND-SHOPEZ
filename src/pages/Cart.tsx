import Header from "@/components/Header";
import CartItem from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useGlobalContext } from "@/lib/GlobalContext";

const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart } = useGlobalContext();

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = cart.length > 0 ? 9.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-hero text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/products">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>
          </div>
          <p className="text-lg md:text-xl text-blue-100">
            Review your items and proceed to checkout
          </p>
        </div>
      </section>

      <section className="py-6 md:py-8">
        <div className="container mx-auto px-4">
          {cart.length === 0 ? (
            <div className="text-center py-12 md:py-16">
              <ShoppingBag className="h-20 w-20 md:h-24 md:w-24 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link to="/products">
                <Button variant="gradient" size="lg" className="h-12 px-8">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Cart Items ({cart.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cart.map((item) => (
                      <CartItem
                        key={item.id}
                        {...item}
                        onUpdateQuantity={updateCartQuantity}
                        onRemove={removeFromCart}
                      />
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="lg:sticky lg:top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm md:text-base">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm md:text-base">
                        <span>Shipping:</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm md:text-base">
                        <span>Tax:</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg md:text-xl font-bold">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <Link to="/checkout">
                        <Button variant="gradient" size="lg" className="w-full h-12">
                          Proceed to Checkout
                        </Button>
                      </Link>
                      <Link to="/products">
                        <Button variant="outline" size="lg" className="w-full h-12">
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>

                    {/* Trust Badges */}
                    <div className="pt-4 border-t">
                      <p className="text-xs md:text-sm text-muted-foreground text-center">
                        Secure checkout with 256-bit SSL encryption
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cart;
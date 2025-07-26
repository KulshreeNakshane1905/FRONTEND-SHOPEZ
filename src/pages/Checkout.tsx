import Header from "@/components/Header";
import CheckoutForm from "@/components/CheckoutForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "@/lib/GlobalContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, addOrder, clearCart } = useGlobalContext();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Calculate cart total from actual cart
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleOrderSubmit = async (formData: any) => {
    setIsProcessing(true);
    
    // Mock API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Order submitted:', formData);
      
      // Create order object
      const orderId = `order_${Date.now()}`;
      const orderNumber = `SE${Date.now().toString().slice(-6)}`;
      const orderTotal = cartTotal + 9.99 + (cartTotal * 0.08);
      
      const newOrder = {
        id: orderId,
        orderNumber: orderNumber,
        orderDate: new Date().toISOString(),
        status: 'pending' as const,
        items: [...cart],
        total: orderTotal,
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        paymentMethod: formData.paymentMethod || 'Credit Card'
      };
      
      // Add order to global context
      addOrder(newOrder);
      
      // Clear cart after successful order
      clearCart();
      
      // Redirect to order confirmation
      navigate('/order-confirmation', { 
        state: { 
          orderData: formData, 
          orderTotal: orderTotal,
          orderId: orderId
        } 
      });
    } catch (error) {
      console.error('Order failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-hero text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-4xl font-bold">Checkout</h1>
          </div>
          <p className="text-xl text-blue-100">
            Complete your order securely
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {isProcessing ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                  <h2 className="text-2xl font-bold mb-2">Processing Your Order</h2>
                  <p className="text-muted-foreground">
                    Please wait while we process your payment...
                  </p>
                </CardContent>
              </Card>
            ) : (
              <CheckoutForm total={cartTotal} onSubmit={handleOrderSubmit} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
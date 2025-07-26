import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { CheckCircle, Package, Truck, CreditCard } from "lucide-react";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get order data from navigation state
  const orderData = location.state?.orderData;
  const orderTotal = location.state?.orderTotal || 0;
  
  // Generate random order number
  const orderNumber = `SE${Date.now().toString().slice(-6)}`;
  
  // If no order data, redirect to home
  if (!orderData) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Success Header */}
      <section className="bg-gradient-hero text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-300" />
          <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-xl text-blue-100">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Order Details Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Order Number</p>
                      <p className="font-semibold">{orderNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Order Date</p>
                      <p className="font-semibold">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Shipping Address</p>
                    <div className="text-sm">
                      <p>{orderData.firstName} {orderData.lastName}</p>
                      <p>{orderData.address}</p>
                      <p>{orderData.city}, {orderData.state} {orderData.zipCode}</p>
                      <p>{orderData.country}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${(orderTotal - 9.99 - (orderTotal - 9.99) * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>$9.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>${((orderTotal - 9.99) * 0.08).toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>${orderTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  What happens next?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Order Processing</h4>
                      <p className="text-sm text-muted-foreground">
                        We'll prepare your items for shipment within 1-2 business days.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-semibold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Shipping Notification</h4>
                      <p className="text-sm text-muted-foreground">
                        You'll receive tracking information via email once your order ships.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-semibold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Delivery</h4>
                      <p className="text-sm text-muted-foreground">
                        Your order will arrive in 3-5 business days.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products" className="flex-1">
                <Button variant="gradient" size="lg" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
              <Link to="/orders" className="flex-1">
                <Button variant="outline" size="lg" className="w-full">
                  View My Orders
                </Button>
              </Link>
            </div>

            {/* Email Confirmation Note */}
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-center">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    A confirmation email has been sent to {orderData.email}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderConfirmation;
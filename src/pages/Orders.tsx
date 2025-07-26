import React from "react";
import { useGlobalContext } from "@/lib/GlobalContext";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  XCircle, 
  ArrowRight,
  ShoppingBag,
  Calendar,
  MapPin,
  CreditCard
} from "lucide-react";

const Orders = () => {
  const { orders } = useGlobalContext();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'processing':
        return <Package className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-hero text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Package className="h-8 w-8" />
            <h1 className="text-4xl font-bold">My Orders</h1>
          </div>
          <p className="text-xl text-blue-100">
            Track your orders and view order history
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          {orders.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">No orders yet</h2>
              <p className="text-muted-foreground mb-8">
                You haven't placed any orders yet. Start shopping to see your orders here.
              </p>
              <Link to="/products">
                <Button variant="gradient" size="lg">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                        <div>
                          <CardTitle className="text-lg">Order #{order.orderNumber}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Placed on {formatDate(order.orderDate)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          ${order.total.toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Order Items */}
                      <div>
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          Order Items
                        </h3>
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                              <div className="w-12 h-12 rounded-lg overflow-hidden bg-white">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium truncate">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Qty: {item.quantity} × ${item.price}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Details */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Shipping Address
                          </h3>
                          <div className="p-3 bg-muted/30 rounded-lg">
                            <p className="font-medium">
                              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {order.shippingAddress.address}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {order.shippingAddress.country}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            Payment Method
                          </h3>
                          <div className="p-3 bg-muted/30 rounded-lg">
                            <p className="font-medium">{order.paymentMethod}</p>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Order Timeline
                          </h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span>Order placed - {formatDate(order.orderDate)}</span>
                            </div>
                            {order.status !== 'pending' && (
                              <div className="flex items-center gap-2 text-sm">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span>Order confirmed - {formatDate(order.orderDate)}</span>
                              </div>
                            )}
                            {['shipped', 'delivered'].includes(order.status) && (
                              <div className="flex items-center gap-2 text-sm">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span>Order shipped - {formatDate(order.orderDate)}</span>
                              </div>
                            )}
                            {order.status === 'delivered' && (
                              <div className="flex items-center gap-2 text-sm">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>Order delivered - {formatDate(order.orderDate)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    {/* Order Summary */}
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Order ID: {order.id}
                      </div>
                      <div className="flex items-center gap-2">
                        <Link to={`/order-confirmation/${order.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </Link>
                        {order.status === 'delivered' && (
                          <Button variant="outline" size="sm">
                            Reorder
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Orders; 
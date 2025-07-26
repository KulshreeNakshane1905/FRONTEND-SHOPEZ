import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, X } from "lucide-react";

interface CartItemProps {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItem = ({ 
  id, 
  title, 
  price, 
  image, 
  quantity, 
  onUpdateQuantity, 
  onRemove 
}: CartItemProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Product Image */}
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate mb-2">{title}</h3>
            <p className="text-2xl font-bold text-primary mb-2 sm:mb-0">${price}</p>
          </div>

          {/* Quantity Controls and Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {/* Quantity Controls */}
            <div className="flex items-center gap-2 border rounded-lg p-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 sm:h-8 sm:w-8"
                onClick={() => onUpdateQuantity(id, Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-semibold min-w-[2rem] text-center text-lg sm:text-base">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 sm:h-8 sm:w-8"
                onClick={() => onUpdateQuantity(id, quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Remove Button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive h-10 w-10 sm:h-8 sm:w-8"
              onClick={() => onRemove(id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Total Price */}
        <div className="mt-4 text-right">
          <span className="text-lg font-semibold text-foreground">
            Total: ${(price * quantity).toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;
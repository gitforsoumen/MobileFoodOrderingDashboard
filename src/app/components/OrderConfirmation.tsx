import { CheckCircle2, Clock, MapPin, CreditCard } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface OrderConfirmationProps {
  orderId: string;
  total: number;
  paymentMethod: string;
  estimatedTime: string;
  onViewOrder: () => void;
  onContinueShopping: () => void;
}

export function OrderConfirmation({
  orderId,
  total,
  paymentMethod,
  estimatedTime,
  onViewOrder,
  onContinueShopping,
}: OrderConfirmationProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 pb-24">
      {/* Success Animation */}
      <div className="mb-6 relative">
        <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
          <CheckCircle2 className="w-20 h-20 text-green-600" />
        </div>
        <div className="absolute inset-0 w-32 h-32 bg-green-200 rounded-full animate-ping opacity-20" />
      </div>

      {/* Success Message */}
      <h1 className="text-2xl mb-2 text-center">Order Confirmed!</h1>
      <p className="text-gray-600 text-center mb-8">
        Your order has been successfully placed
      </p>

      {/* Order Details */}
      <Card className="w-full max-w-md mb-6 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 p-4 border-b border-blue-200">
          <p className="text-sm text-gray-600 mb-1">Order ID</p>
          <p className="text-xl font-medium">#{orderId}</p>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Estimated Ready Time</p>
              <p className="font-medium">{estimatedTime}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pickup Location</p>
              <p className="font-medium">Main Cafeteria Counter</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <CreditCard className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Payment Method</p>
              <p className="font-medium capitalize">{paymentMethod}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Amount</span>
              <span className="text-2xl text-blue-600">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="w-full max-w-md space-y-3">
        <Button
          onClick={onViewOrder}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
        >
          Track Your Order
        </Button>
        <Button
          onClick={onContinueShopping}
          variant="outline"
          className="w-full h-12"
        >
          Continue Shopping
        </Button>
      </div>

      {/* Additional Info */}
      <Card className="w-full max-w-md mt-6 p-4 bg-yellow-50 border-yellow-200">
        <p className="text-sm text-yellow-800 text-center">
          💡 You'll receive a notification when your order is ready for pickup
        </p>
      </Card>
    </div>
  );
}

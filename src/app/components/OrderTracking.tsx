import { ArrowLeft, CheckCircle2, Clock, Package, Truck, UtensilsCrossed } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

interface Order {
  id: string;
  items: string[];
  total: number;
  status: "pending" | "preparing" | "ready" | "delivered";
  placedAt: string;
  estimatedTime: string;
}

interface OrderTrackingProps {
  onBack: () => void;
  orders: Order[];
}

export function OrderTracking({ onBack, orders }: OrderTrackingProps) {
  const getStatusSteps = (status: Order["status"]) => {
    const steps = [
      { label: "Order Placed", icon: CheckCircle2, status: "complete" },
      { label: "Preparing", icon: UtensilsCrossed, status: status === "pending" ? "pending" : "complete" },
      { label: "Ready", icon: Package, status: status === "pending" || status === "preparing" ? "pending" : "complete" },
      { label: "Delivered", icon: Truck, status: status === "delivered" ? "complete" : "pending" },
    ];
    return steps;
  };

  const getProgressPercentage = (status: Order["status"]) => {
    const percentages = {
      pending: 25,
      preparing: 50,
      ready: 75,
      delivered: 100,
    };
    return percentages[status];
  };

  const getStatusColor = (status: Order["status"]) => {
    const colors = {
      pending: "bg-yellow-500",
      preparing: "bg-blue-500",
      ready: "bg-green-500",
      delivered: "bg-purple-500",
    };
    return colors[status];
  };

  const getStatusBadge = (status: Order["status"]) => {
    const badges = {
      pending: { text: "Order Received", className: "bg-yellow-100 text-yellow-800" },
      preparing: { text: "Preparing", className: "bg-blue-100 text-blue-800" },
      ready: { text: "Ready for Pickup", className: "bg-green-100 text-green-800" },
      delivered: { text: "Delivered", className: "bg-purple-100 text-purple-800" },
    };
    return badges[status];
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl">Order Tracking</h1>
        </div>
      </div>

      {/* Orders */}
      <div className="p-4 space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-gray-600 mb-2">No active orders</p>
            <p className="text-sm text-gray-500">Your order history will appear here</p>
          </div>
        ) : (
          orders.map((order) => {
            const steps = getStatusSteps(order.status);
            const badge = getStatusBadge(order.status);
            const progress = getProgressPercentage(order.status);

            return (
              <Card key={order.id} className="overflow-hidden">
                {/* Order Header */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 p-4 border-b border-blue-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm text-gray-600">Order ID</p>
                      <p className="font-medium">{order.id}</p>
                    </div>
                    <Badge className={badge.className}>{badge.text}</Badge>
                  </div>

                  <div className="space-y-1 mb-3">
                    {order.items.map((item, index) => (
                      <p key={index} className="text-sm text-gray-700">
                        • {item}
                      </p>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Placed at {order.placedAt}</span>
                    <span className="font-medium text-blue-600">${order.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="p-4 bg-white">
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Order Progress</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  {/* Status Steps */}
                  <div className="space-y-4">
                    {steps.map((step, index) => {
                      const isComplete = step.status === "complete";
                      const isLast = index === steps.length - 1;

                      return (
                        <div key={index} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                                isComplete
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-200 text-gray-400"
                              }`}
                            >
                              <step.icon className="w-5 h-5" />
                            </div>
                            {!isLast && (
                              <div
                                className={`w-0.5 h-12 ${
                                  isComplete ? "bg-blue-600" : "bg-gray-200"
                                }`}
                              />
                            )}
                          </div>
                          <div className="flex-1 pt-2">
                            <p
                              className={`font-medium ${
                                isComplete ? "text-gray-900" : "text-gray-400"
                              }`}
                            >
                              {step.label}
                            </p>
                            {index === 1 && order.status === "preparing" && (
                              <div className="flex items-center gap-2 mt-1 text-sm text-blue-600">
                                <Clock className="w-4 h-4 animate-pulse" />
                                <span>Est. {order.estimatedTime}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                {order.status === "ready" && (
                  <div className="p-4 bg-green-50 border-t border-green-200">
                    <div className="flex items-center gap-2 text-green-800 mb-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="font-medium">Your order is ready!</span>
                    </div>
                    <p className="text-sm text-green-700">
                      Please pick up your order from the cafeteria counter.
                    </p>
                  </div>
                )}

                {order.status === "delivered" && (
                  <div className="p-4 bg-purple-50 border-t border-purple-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-purple-800">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-medium">Order completed!</span>
                      </div>
                      <button className="text-sm text-purple-700 hover:text-purple-900 underline">
                        Rate Order
                      </button>
                    </div>
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}

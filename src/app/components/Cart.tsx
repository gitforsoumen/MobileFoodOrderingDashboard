import { ArrowLeft, Trash2, Plus, Minus, CreditCard, Wallet } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  isVeg: boolean;
  calories: number;
}

interface CartProps {
  cartItems: { item: MenuItem; quantity: number }[];
  onUpdateQuantity: (itemId: number, quantity: number) => void;
  onRemoveItem: (itemId: number) => void;
  onBack: () => void;
  onCheckout: (paymentMethod: string) => void;
}

export function Cart({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onBack,
  onCheckout,
}: CartProps) {
  const subtotal = cartItems.reduce(
    (sum, { item, quantity }) => sum + item.price * quantity,
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const paymentMethods = [
    { id: "wallet", name: "Company Wallet", icon: Wallet, balance: "$450.00" },
    { id: "card", name: "Debit Card", icon: CreditCard, balance: "••• 4242" },
  ];

  return (
    <div className="flex flex-col h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl">Your Cart</h1>
          <span className="ml-auto text-sm text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </span>
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Wallet className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-gray-600 mb-2">Your cart is empty</p>
            <p className="text-sm text-gray-500">Add items from the menu to get started</p>
            <Button onClick={onBack} className="mt-6 bg-blue-600 hover:bg-blue-700">
              Browse Menu
            </Button>
          </div>
        ) : (
          <>
            {cartItems.map(({ item, quantity }) => (
              <Card key={item.id} className="p-4">
                <div className="flex gap-3">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{item.name}</h3>
                        <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="ml-2 p-1 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onUpdateQuantity(item.id, quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center">{quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onUpdateQuantity(item.id, quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="font-medium text-blue-600">
                        ${(item.price * quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* Order Summary */}
            <Card className="p-4 bg-gray-50 border-gray-200">
              <h3 className="font-medium mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-base">
                  <span>Total</span>
                  <span className="text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </Card>

            {/* Payment Methods */}
            <div className="pt-2">
              <h3 className="font-medium mb-3">Payment Method</h3>
              <div className="space-y-2">
                {paymentMethods.map((method) => (
                  <Card
                    key={method.id}
                    className="p-4 cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-500"
                    onClick={() => onCheckout(method.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-3 rounded-xl">
                        <method.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-gray-600">{method.balance}</p>
                      </div>
                      <div className="text-blue-600">→</div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Checkout Button - Fixed at bottom */}
      {cartItems.length > 0 && (
        <div className="bg-white border-t border-gray-200 p-4">
          <Button
            onClick={() => onCheckout("wallet")}
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg"
          >
            Proceed to Checkout • ${total.toFixed(2)}
          </Button>
        </div>
      )}
    </div>
  );
}

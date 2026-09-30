import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Menu } from "./components/Menu";
import { Cart } from "./components/Cart";
import { OrderTracking } from "./components/OrderTracking";
import { Profile } from "./components/Profile";
import { Feedback } from "./components/Feedback";
import { Support } from "./components/Support";
import { Notifications } from "./components/Notifications";
import { OrderConfirmation } from "./components/OrderConfirmation";
import { BottomNav } from "./components/BottomNav";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

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

interface Order {
  id: string;
  items: string[];
  total: number;
  status: "pending" | "preparing" | "ready" | "delivered";
  placedAt: string;
  estimatedTime: string;
}

type Page =
  | "home"
  | "menu"
  | "cart"
  | "orders"
  | "profile"
  | "feedback"
  | "support"
  | "notifications"
  | "confirmation";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [cartItems, setCartItems] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1247",
      items: ["Grilled Chicken Salad", "Fresh Orange Juice"],
      total: 15.49,
      status: "preparing",
      placedAt: "11:30 AM",
      estimatedTime: "15 minutes",
    },
  ]);
  const [lastOrderId, setLastOrderId] = useState("1247");
  const [lastOrderTotal, setLastOrderTotal] = useState(15.49);
  const [lastPaymentMethod, setLastPaymentMethod] = useState("wallet");

  const userName = "Sarah Johnson";
  const userEmail = "sarah.j@company.com";
  const notifications = 3;

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleAddToCart = (item: MenuItem, quantity: number) => {
    const existingItemIndex = cartItems.findIndex((ci) => ci.item.id === item.id);

    if (existingItemIndex >= 0) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += quantity;
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { item, quantity }]);
    }

    toast.success(`${item.name} added to cart!`, {
      description: `${quantity} item${quantity > 1 ? "s" : ""} added`,
    });
  };

  const handleUpdateCartQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemoveFromCart(itemId);
      return;
    }

    setCartItems(
      cartItems.map((ci) =>
        ci.item.id === itemId ? { ...ci, quantity: newQuantity } : ci
      )
    );
  };

  const handleRemoveFromCart = (itemId: number) => {
    const item = cartItems.find((ci) => ci.item.id === itemId);
    setCartItems(cartItems.filter((ci) => ci.item.id !== itemId));
    
    if (item) {
      toast.error(`${item.item.name} removed from cart`);
    }
  };

  const handleCheckout = (paymentMethod: string) => {
    if (cartItems.length === 0) return;

    const subtotal = cartItems.reduce(
      (sum, { item, quantity }) => sum + item.price * quantity,
      0
    );
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    const newOrderId = String(Number(lastOrderId) + 1);
    const itemNames = cartItems.map((ci) => ci.item.name);

    const newOrder: Order = {
      id: newOrderId,
      items: itemNames,
      total,
      status: "pending",
      placedAt: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
      estimatedTime: "15-20 minutes",
    };

    setOrders([newOrder, ...orders]);
    setLastOrderId(newOrderId);
    setLastOrderTotal(total);
    setLastPaymentMethod(paymentMethod);
    setCartItems([]);
    setCurrentPage("confirmation");

    toast.success("Order placed successfully!", {
      description: `Order #${newOrderId} is being prepared`,
    });

    // Simulate order status updates
    setTimeout(() => {
      setOrders((prev) =>
        prev.map((o) => (o.id === newOrderId ? { ...o, status: "preparing" as const } : o))
      );
      toast.info("Order update", {
        description: "Your order is now being prepared",
      });
    }, 3000);
  };

  const handleSubmitFeedback = (feedback: {
    rating: number;
    category: string;
    comment: string;
  }) => {
    toast.success("Feedback submitted!", {
      description: "Thank you for your valuable feedback",
    });
    
    setTimeout(() => {
      setCurrentPage("home");
    }, 1500);
  };

  const totalCartItems = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl relative">
        {currentPage === "home" && (
          <Dashboard
            onNavigate={handleNavigate}
            userName={userName}
            notifications={notifications}
          />
        )}

        {currentPage === "menu" && (
          <Menu onAddToCart={handleAddToCart} cartItems={cartItems} />
        )}

        {currentPage === "cart" && (
          <Cart
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveFromCart}
            onBack={() => setCurrentPage("menu")}
            onCheckout={handleCheckout}
          />
        )}

        {currentPage === "orders" && (
          <OrderTracking onBack={() => setCurrentPage("home")} orders={orders} />
        )}

        {currentPage === "profile" && (
          <Profile
            onBack={() => setCurrentPage("home")}
            userName={userName}
            userEmail={userEmail}
          />
        )}

        {currentPage === "feedback" && (
          <Feedback
            onBack={() => setCurrentPage("home")}
            onSubmit={handleSubmitFeedback}
          />
        )}

        {currentPage === "support" && (
          <Support onBack={() => setCurrentPage("home")} />
        )}

        {currentPage === "notifications" && (
          <Notifications onBack={() => setCurrentPage("home")} />
        )}

        {currentPage === "confirmation" && (
          <OrderConfirmation
            orderId={lastOrderId}
            total={lastOrderTotal}
            paymentMethod={lastPaymentMethod}
            estimatedTime="15-20 minutes"
            onViewOrder={() => setCurrentPage("orders")}
            onContinueShopping={() => setCurrentPage("menu")}
          />
        )}

        {/* Bottom Navigation */}
        {currentPage !== "cart" && currentPage !== "confirmation" && (
          <BottomNav
            currentPage={currentPage}
            onNavigate={handleNavigate}
            cartItemCount={totalCartItems}
          />
        )}
      </div>

      {/* Toast Notifications */}
      <Toaster position="top-center" />
    </div>
  );
}

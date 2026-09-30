import { ArrowLeft, Bell, CheckCircle2, Clock, Gift, TrendingUp } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface NotificationsProps {
  onBack: () => void;
}

interface Notification {
  id: number;
  type: "order" | "promotion" | "reminder" | "achievement";
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: typeof Bell;
  color: string;
}

export function Notifications({ onBack }: NotificationsProps) {
  const notifications: Notification[] = [
    {
      id: 1,
      type: "order",
      title: "Order Ready!",
      message: "Your order #1247 is ready for pickup at the cafeteria counter.",
      time: "5 min ago",
      read: false,
      icon: CheckCircle2,
      color: "from-green-500 to-green-600",
    },
    {
      id: 2,
      type: "reminder",
      title: "Lunch Reminder",
      message: "Don't forget to order your lunch! Your favorite Grilled Chicken Salad is available.",
      time: "1 hour ago",
      read: false,
      icon: Clock,
      color: "from-orange-500 to-orange-600",
    },
    {
      id: 3,
      type: "promotion",
      title: "Special Offer! 🎉",
      message: "Get 20% off on all pasta dishes today. Limited time offer!",
      time: "2 hours ago",
      read: true,
      icon: Gift,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 4,
      type: "achievement",
      title: "New Achievement Unlocked!",
      message: "Congratulations! You've earned the 'Foodie Champion' badge for ordering 100+ meals.",
      time: "Yesterday",
      read: true,
      icon: TrendingUp,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      id: 5,
      type: "order",
      title: "Order Confirmed",
      message: "Your order #1246 has been confirmed and is being prepared.",
      time: "Yesterday",
      read: true,
      icon: CheckCircle2,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 6,
      type: "reminder",
      title: "Meal Plan Reminder",
      message: "Your dinner meal plan for today at 7:00 PM is coming up.",
      time: "2 days ago",
      read: true,
      icon: Clock,
      color: "from-orange-500 to-orange-600",
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          {unreadCount > 0 && (
            <button className="text-sm text-blue-100 hover:text-white">
              Mark all as read
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Bell className="w-8 h-8" />
          <div>
            <h1 className="text-2xl">Notifications</h1>
            <p className="text-blue-100">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
            </p>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-4 space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Bell className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-gray-600 mb-2">No notifications yet</p>
            <p className="text-sm text-gray-500">We'll notify you when something important happens</p>
          </div>
        ) : (
          <>
            {/* Today Section */}
            <div>
              <p className="text-sm text-gray-500 mb-3 px-2">Today</p>
              {notifications
                .filter((n) => n.time.includes("min") || n.time.includes("hour"))
                .map((notification) => (
                  <Card
                    key={notification.id}
                    className={`mb-3 overflow-hidden cursor-pointer hover:shadow-md transition-all ${
                      !notification.read ? "border-l-4 border-l-blue-500 bg-blue-50/50" : ""
                    }`}
                  >
                    <div className="p-4">
                      <div className="flex gap-3">
                        <div className={`bg-gradient-to-br ${notification.color} text-white p-2 rounded-xl h-fit`}>
                          <notification.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <p className="font-medium">{notification.title}</p>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full ml-2 mt-2 shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>

            {/* Earlier Section */}
            <div className="pt-4">
              <p className="text-sm text-gray-500 mb-3 px-2">Earlier</p>
              {notifications
                .filter((n) => !n.time.includes("min") && !n.time.includes("hour"))
                .map((notification) => (
                  <Card
                    key={notification.id}
                    className="mb-3 overflow-hidden cursor-pointer hover:shadow-md transition-all"
                  >
                    <div className="p-4">
                      <div className="flex gap-3">
                        <div className={`bg-gradient-to-br ${notification.color} text-white p-2 rounded-xl h-fit`}>
                          <notification.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium mb-1">{notification.title}</p>
                          <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

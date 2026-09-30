import { Bell, Clock, TrendingUp, Award, ChefHat, Calendar } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface DashboardProps {
  onNavigate: (page: string) => void;
  userName: string;
  notifications: number;
}

export function Dashboard({ onNavigate, userName, notifications }: DashboardProps) {
  const upcomingMeals = [
    { id: 1, meal: "Lunch", time: "12:30 PM", date: "Today" },
    { id: 2, meal: "Dinner", time: "7:00 PM", date: "Today" },
  ];

  const stats = [
    { label: "Orders This Month", value: "24", icon: ChefHat, color: "text-blue-600" },
    { label: "Total Spent", value: "$286", icon: TrendingUp, color: "text-green-600" },
    { label: "Favorite Meals", value: "8", icon: Award, color: "text-purple-600" },
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-blue-100 text-sm">Welcome back,</p>
            <h1 className="text-2xl mt-1">{userName}</h1>
          </div>
          <button
            onClick={() => onNavigate("notifications")}
            className="relative bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
        </div>

        {/* Quick Action */}
        <button
          onClick={() => onNavigate("menu")}
          className="w-full bg-white text-blue-600 py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors shadow-lg"
        >
          <ChefHat className="w-5 h-5" />
          <span>Order Food Now</span>
        </button>
      </div>

      {/* Upcoming Meal Reminders */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg">Upcoming Meals</h2>
          <Calendar className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="space-y-3">
          {upcomingMeals.map((meal) => (
            <Card
              key={meal.id}
              className="p-4 bg-gradient-to-r from-orange-50 to-orange-100/50 border-orange-200 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onNavigate("menu")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-500 text-white p-2 rounded-xl">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">{meal.meal}</p>
                    <p className="text-sm text-gray-600">{meal.time}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-orange-200 text-orange-800">
                  {meal.date}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="px-6 mt-6">
        <h2 className="text-lg mb-4">Your Overview</h2>
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onNavigate("profile")}
            >
              <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
              <p className="text-2xl mb-1">{stat.value}</p>
              <p className="text-xs text-gray-600">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Active Orders */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg">Active Orders</h2>
          <button
            onClick={() => onNavigate("orders")}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            View All
          </button>
        </div>
        
        <Card className="p-4 bg-gradient-to-r from-green-50 to-green-100/50 border-green-200">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-medium">Order #1247</p>
              <p className="text-sm text-gray-600">Grilled Chicken Salad</p>
            </div>
            <Badge className="bg-green-500 text-white hover:bg-green-600">
              Preparing
            </Badge>
          </div>
          <div className="w-full bg-green-200 rounded-full h-2 overflow-hidden">
            <div className="bg-green-500 h-full w-2/3 rounded-full animate-pulse"></div>
          </div>
          <button
            onClick={() => onNavigate("orders")}
            className="w-full mt-3 text-sm text-green-700 hover:text-green-800"
          >
            Track Order →
          </button>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="px-6 mt-6">
        <h2 className="text-lg mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 gap-3">
          <Card
            className="p-4 text-center cursor-pointer hover:shadow-md transition-shadow bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200"
            onClick={() => onNavigate("feedback")}
          >
            <div className="bg-purple-500 text-white p-3 rounded-xl w-fit mx-auto mb-2">
              <Award className="w-5 h-5" />
            </div>
            <p className="text-sm">Submit Feedback</p>
          </Card>
          <Card
            className="p-4 text-center cursor-pointer hover:shadow-md transition-shadow bg-gradient-to-br from-pink-50 to-pink-100/50 border-pink-200"
            onClick={() => onNavigate("support")}
          >
            <div className="bg-pink-500 text-white p-3 rounded-xl w-fit mx-auto mb-2">
              <Bell className="w-5 h-5" />
            </div>
            <p className="text-sm">Get Support</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

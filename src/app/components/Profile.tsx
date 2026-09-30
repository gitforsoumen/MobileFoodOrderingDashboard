import { ArrowLeft, User, CreditCard, Bell, HelpCircle, Settings, Award, TrendingUp, LogOut } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface ProfileProps {
  onBack: () => void;
  userName: string;
  userEmail: string;
}

export function Profile({ onBack, userName, userEmail }: ProfileProps) {
  const stats = [
    { label: "Total Orders", value: "124", icon: TrendingUp },
    { label: "Loyalty Points", value: "2,450", icon: Award },
  ];

  const menuItems = [
    { icon: User, label: "Edit Profile", action: "editProfile" },
    { icon: CreditCard, label: "Payment Methods", action: "payments" },
    { icon: Bell, label: "Notifications", action: "notifications" },
    { icon: Settings, label: "Preferences", action: "preferences" },
    { icon: HelpCircle, label: "Help & Support", action: "support" },
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-b-3xl">
        <button
          onClick={onBack}
          className="mb-4 p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl">
            {userName.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl mb-1">{userName}</h1>
            <p className="text-blue-100">{userEmail}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 p-4 text-white">
              <stat.icon className="w-5 h-5 mb-2 text-blue-100" />
              <p className="text-2xl mb-1">{stat.value}</p>
              <p className="text-sm text-blue-100">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-6 space-y-2">
        {menuItems.map((item, index) => (
          <div key={index}>
            <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="bg-gray-100 p-2 rounded-lg">
                <item.icon className="w-5 h-5 text-gray-700" />
              </div>
              <span className="flex-1 text-left">{item.label}</span>
              <span className="text-gray-400">→</span>
            </button>
            {index < menuItems.length - 1 && <Separator className="my-2" />}
          </div>
        ))}
      </div>

      {/* Achievements Section */}
      <div className="px-6 mb-6">
        <h2 className="text-lg mb-4">Recent Achievements</h2>
        <div className="space-y-3">
          <Card className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100/50 border-yellow-200">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500 text-white p-3 rounded-xl">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="font-medium">Foodie Champion</p>
                <p className="text-sm text-gray-600">Ordered 100+ meals</p>
              </div>
              <Badge className="ml-auto bg-yellow-500 text-white hover:bg-yellow-600">
                New
              </Badge>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-r from-green-50 to-green-100/50 border-green-200">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 text-white p-3 rounded-xl">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="font-medium">Early Bird</p>
                <p className="text-sm text-gray-600">Ordered breakfast 30 times</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-6">
        <button className="w-full flex items-center justify-center gap-2 p-4 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

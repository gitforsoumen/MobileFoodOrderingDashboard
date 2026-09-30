import { useState } from "react";
import { Search, Filter, Star, Plus, Minus } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
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

interface MenuProps {
  onAddToCart: (item: MenuItem, quantity: number) => void;
  cartItems: { item: MenuItem; quantity: number }[];
}

export function Menu({ onAddToCart, cartItems }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const categories = ["All", "Breakfast", "Lunch", "Dinner", "Snacks", "Beverages"];

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Grilled Chicken Salad",
      description: "Fresh greens with grilled chicken, cherry tomatoes, and balsamic",
      price: 12.99,
      category: "Lunch",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1605034298551-baacf17591d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2FsYWQlMjBib3dsJTIwZnJlc2h8ZW58MXx8fHwxNzcwMjE4OTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      isVeg: false,
      calories: 350,
    },
    {
      id: 2,
      name: "Classic Beef Burger",
      description: "Angus beef patty with cheese, lettuce, tomato & special sauce",
      price: 14.99,
      category: "Lunch",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1651843465180-5965076f7368?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmcmllcyUyMG1lYWx8ZW58MXx8fHwxNzcwMjc1ODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      isVeg: false,
      calories: 680,
    },
    {
      id: 3,
      name: "Creamy Pasta Carbonara",
      description: "Classic Italian pasta with bacon, eggs, and parmesan",
      price: 13.99,
      category: "Dinner",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1739417083034-4e9118f487be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpc2glMjBpdGFsaWFufGVufDF8fHx8MTc3MDI3NTg0OHww&ixlib=rb-4.1.0&q=80&w=1080",
      isVeg: false,
      calories: 550,
    },
    {
      id: 4,
      name: "Fresh Sushi Platter",
      description: "Assorted sushi rolls with wasabi and pickled ginger",
      price: 18.99,
      category: "Dinner",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1764183122524-974ccfb709fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHBsYXR0ZXIlMjBqYXBhbmVzZXxlbnwxfHx8fDE3NzAxNzc5Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      isVeg: false,
      calories: 420,
    },
    {
      id: 5,
      name: "Avocado Toast",
      description: "Smashed avocado on sourdough with poached eggs",
      price: 9.99,
      category: "Breakfast",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1616902666559-af398792d890?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjB0b2FzdCUyMGF2b2NhZG98ZW58MXx8fHwxNzcwMjAzMDUzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      isVeg: true,
      calories: 380,
    },
    {
      id: 6,
      name: "Gourmet Steak",
      description: "Premium cut steak with roasted vegetables",
      price: 24.99,
      category: "Dinner",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1767441358044-14d9f8f5b53d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwcmVzdGF1cmFudCUyMG1lYWwlMjBwbGF0ZWR8ZW58MXx8fHwxNzcwMjc1ODQ3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      isVeg: false,
      calories: 720,
    },
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleQuantityChange = (itemId: number, change: number) => {
    const currentQty = quantities[itemId] || 0;
    const newQty = Math.max(0, currentQty + change);
    setQuantities({ ...quantities, [itemId]: newQty });
  };

  const handleAddToCart = (item: MenuItem) => {
    const qty = quantities[item.id] || 1;
    onAddToCart(item, qty);
    setQuantities({ ...quantities, [item.id]: 0 });
  };

  const getCartQuantity = (itemId: number) => {
    const cartItem = cartItems.find((ci) => ci.item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="pb-20">
      {/* Search Header */}
      <div className="bg-white sticky top-0 z-10 border-b border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search for dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-12 h-12 rounded-xl"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="sticky top-[72px] z-10 bg-white border-b border-gray-200 px-4 py-3 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-4">
        {filteredItems.map((item) => {
          const currentQty = quantities[item.id] || 0;
          const inCart = getCartQuantity(item.id);

          return (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex gap-4 p-4">
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-medium truncate">{item.name}</h3>
                    {item.isVeg && (
                      <Badge variant="outline" className="border-green-500 text-green-700 shrink-0">
                        VEG
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">{item.description}</p>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{item.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{item.calories} cal</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-lg text-blue-600">${item.price.toFixed(2)}</p>
                    
                    {currentQty === 0 && inCart === 0 ? (
                      <Button
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                    ) : currentQty > 0 ? (
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center">{currentQty}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(item)}
                          className="bg-blue-600 hover:bg-blue-700 ml-1"
                        >
                          Add
                        </Button>
                      </div>
                    ) : (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        In Cart ({inCart})
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

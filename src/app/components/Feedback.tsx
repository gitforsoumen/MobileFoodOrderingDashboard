import { useState } from "react";
import { ArrowLeft, Star, Send } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

interface FeedbackProps {
  onBack: () => void;
  onSubmit: (feedback: { rating: number; category: string; comment: string }) => void;
}

export function Feedback({ onBack, onSubmit }: FeedbackProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [comment, setComment] = useState("");

  const categories = [
    { id: "food", label: "Food Quality", emoji: "🍽️" },
    { id: "service", label: "Service", emoji: "👥" },
    { id: "delivery", label: "Delivery Speed", emoji: "🚀" },
    { id: "app", label: "App Experience", emoji: "📱" },
    { id: "other", label: "Other", emoji: "💭" },
  ];

  const handleSubmit = () => {
    if (rating > 0 && selectedCategory && comment.trim()) {
      onSubmit({ rating, category: selectedCategory, comment });
      // Reset form
      setRating(0);
      setSelectedCategory("");
      setComment("");
    }
  };

  const isFormValid = rating > 0 && selectedCategory && comment.trim().length > 0;

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
          <h1 className="text-xl">Share Your Feedback</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Rating Section */}
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
          <Label className="text-base mb-4 block">How was your experience?</Label>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110 active:scale-95"
              >
                <Star
                  className={`w-12 h-12 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-center mt-4 text-sm text-gray-600">
              {rating === 5 && "Excellent! 🎉"}
              {rating === 4 && "Great! 😊"}
              {rating === 3 && "Good 👍"}
              {rating === 2 && "Fair 😐"}
              {rating === 1 && "Needs Improvement 😔"}
            </p>
          )}
        </Card>

        {/* Category Selection */}
        <div>
          <Label className="text-base mb-3 block">What would you like to feedback on?</Label>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedCategory === category.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="text-2xl mb-1">{category.emoji}</div>
                <p className="text-sm font-medium">{category.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Comment Section */}
        <div>
          <Label htmlFor="comment" className="text-base mb-3 block">
            Tell us more (Optional)
          </Label>
          <Textarea
            id="comment"
            placeholder="Share your thoughts, suggestions, or concerns..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[120px] resize-none"
          />
          <p className="text-sm text-gray-500 mt-2">{comment.length}/500 characters</p>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5 mr-2" />
          Submit Feedback
        </Button>

        {/* Recent Feedback */}
        <div className="pt-6 border-t border-gray-200">
          <h2 className="text-base mb-4">Your Recent Feedback</h2>
          <div className="space-y-3">
            <Card className="p-4 bg-gray-50">
              <div className="flex items-start justify-between mb-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">2 days ago</span>
              </div>
              <p className="text-sm text-gray-700 mb-1">Food Quality</p>
              <p className="text-sm text-gray-600">
                "The grilled chicken salad was absolutely delicious! Fresh ingredients and perfect portion size."
              </p>
            </Card>

            <Card className="p-4 bg-gray-50">
              <div className="flex items-start justify-between mb-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <Star className="w-4 h-4 text-gray-300" />
                </div>
                <span className="text-xs text-gray-500">1 week ago</span>
              </div>
              <p className="text-sm text-gray-700 mb-1">Delivery Speed</p>
              <p className="text-sm text-gray-600">
                "Quick service but could be faster during lunch rush."
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

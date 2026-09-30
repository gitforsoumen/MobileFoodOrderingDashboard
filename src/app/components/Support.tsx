import { ArrowLeft, MessageCircle, Phone, Mail, HelpCircle, FileText } from "lucide-react";
import { Card } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface SupportProps {
  onBack: () => void;
}

export function Support({ onBack }: SupportProps) {
  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      available: "9 AM - 6 PM",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "+1 (555) 123-4567",
      available: "Mon - Fri",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "support@foodapp.com",
      available: "24/7 Response",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const faqs = [
    {
      question: "How do I place an order?",
      answer: "Browse the menu, select your items, add them to cart, and proceed to checkout. Choose your payment method and confirm your order. You'll receive a confirmation and can track your order in real-time.",
    },
    {
      question: "Can I modify my order after placing it?",
      answer: "You can modify your order within 2 minutes of placing it. Go to Order Tracking, select your active order, and tap 'Modify Order'. After this window, please contact support for assistance.",
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept company wallet, debit cards, credit cards, and digital payment methods like Apple Pay and Google Pay. All transactions are secure and encrypted.",
    },
    {
      question: "How long does delivery take?",
      answer: "Typical delivery time is 15-30 minutes depending on your location and order complexity. You can track your order in real-time through the app.",
    },
    {
      question: "What if I have dietary restrictions?",
      answer: "Each menu item displays detailed nutritional information and allergen warnings. Use the filter option to view vegetarian, vegan, gluten-free, and other dietary preference options.",
    },
    {
      question: "How do I earn loyalty points?",
      answer: "You earn 10 points for every dollar spent. Points can be redeemed for discounts and exclusive menu items. Check your profile to see your current points balance.",
    },
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
        <div className="flex items-center gap-3 mb-2">
          <HelpCircle className="w-8 h-8" />
          <h1 className="text-2xl">Help & Support</h1>
        </div>
        <p className="text-blue-100">We're here to help you 24/7</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Contact Methods */}
        <div>
          <h2 className="text-lg mb-4">Contact Us</h2>
          <div className="space-y-3">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className={`h-1 bg-gradient-to-r ${method.color}`} />
                <div className="p-4 flex items-center gap-4">
                  <div className={`bg-gradient-to-br ${method.color} text-white p-3 rounded-xl`}>
                    <method.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium mb-1">{method.title}</p>
                    <p className="text-sm text-gray-600">{method.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{method.available}</p>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg">Frequently Asked Questions</h2>
          </div>
          
          <Card className="overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-b-0">
                  <AccordionTrigger className="px-4 py-4 hover:bg-gray-50 text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-2 text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>

        {/* Quick Tips */}
        <div>
          <h2 className="text-lg mb-4">Quick Tips</h2>
          <div className="space-y-3">
            <Card className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100/50 border-yellow-200">
              <p className="font-medium mb-1">💡 Pro Tip</p>
              <p className="text-sm text-gray-700">
                Set up meal plan reminders to never miss your favorite meals and save time during busy hours!
              </p>
            </Card>
            
            <Card className="p-4 bg-gradient-to-r from-green-50 to-green-100/50 border-green-200">
              <p className="font-medium mb-1">🎯 Did You Know?</p>
              <p className="text-sm text-gray-700">
                You can save your favorite orders for quick reordering. Just tap the heart icon on any menu item!
              </p>
            </Card>
          </div>
        </div>

        {/* Emergency Contact */}
        <Card className="p-4 bg-gradient-to-r from-red-50 to-red-100/50 border-red-200">
          <p className="font-medium text-red-800 mb-2">Emergency or Urgent Issues?</p>
          <p className="text-sm text-red-700 mb-3">
            For urgent matters like food allergies or order emergencies, please call our hotline immediately.
          </p>
          <a
            href="tel:+15551234567"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Call Emergency Hotline</span>
          </a>
        </Card>
      </div>
    </div>
  );
}

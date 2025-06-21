
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for trying out our service",
      credits: "5 credits/month",
      features: [
        "5 face swaps per month",
        "Basic quality processing",
        "Standard support",
        "Watermarked results"
      ]
    },
    {
      name: "Pro",
      price: "$9.99",
      description: "Best for regular users",
      credits: "100 credits/month",
      features: [
        "100 face swaps per month",
        "High quality processing",
        "Priority support",
        "No watermarks",
        "Batch processing",
        "HD downloads"
      ],
      popular: true
    },
    {
      name: "Business",
      price: "$29.99",
      description: "For professionals and businesses",
      credits: "Unlimited credits",
      features: [
        "Unlimited face swaps",
        "Ultra-high quality processing",
        "24/7 priority support",
        "Commercial license",
        "API access",
        "Custom integrations",
        "Team collaboration"
      ]
    }
  ];

  const faqs = [
    {
      question: "What are credits?",
      answer: "Credits are used to process face swaps. Each single face swap uses 1 credit, while multiple face swaps use credits based on the number of faces detected."
    },
    {
      question: "Can I upgrade or downgrade anytime?",
      answer: "Yes, you can change your plan at any time. Changes take effect immediately and we'll prorate the billing accordingly."
    },
    {
      question: "What happens to unused credits?",
      answer: "Unused credits roll over to the next month for Pro users. Free plan credits reset monthly."
    },
    {
      question: "Is there a refund policy?",
      answer: "We offer a 30-day money-back guarantee for all paid plans. No questions asked."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose the perfect plan for your face swapping needs
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-16">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative hover-scale ${plan.popular ? 'border-primary shadow-lg' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "$0" && <span className="text-muted-foreground">/month</span>}
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
                <div className="mt-4 p-2 bg-muted rounded-lg">
                  <span className="font-medium text-primary">{plan.credits}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  {plan.name === "Free" ? "Get Started" : "Choose Plan"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

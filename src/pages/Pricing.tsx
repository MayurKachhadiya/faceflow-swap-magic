
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out our service',
      credits: 10,
      features: [
        '10 face swaps per month',
        'Basic quality output',
        'Standard processing speed',
        'Community support',
      ],
      isPopular: false,
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: 'month',
      description: 'Great for regular users',
      credits: 100,
      features: [
        '100 face swaps per month',
        'High quality output',
        'Fast processing speed',
        'Priority support',
        'HD downloads',
        'No watermarks',
      ],
      isPopular: true,
    },
    {
      name: 'Premium',
      price: '$19.99',
      period: 'month',
      description: 'Perfect for power users',
      credits: 250,
      features: [
        '250 face swaps per month',
        'Ultra HD quality output',
        'Fastest processing speed',
        'Priority support',
        'Commercial license',
        'API access',
        'Bulk processing',
      ],
      isPopular: false,
    },
  ];

  const faqs = [
    {
      question: 'How do credits work?',
      answer: 'Each face swap costs 1 credit. Credits reset monthly with your subscription and never expire for one-time purchases.',
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes, you can cancel your subscription at any time. Your credits will remain valid until the end of your billing period.',
    },
    {
      question: 'What happens to unused credits?',
      answer: 'Unused credits from monthly subscriptions expire at the end of each billing cycle. One-time credit purchases never expire.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for all subscription plans. One-time credit purchases are non-refundable.',
    },
    {
      question: 'Is there a limit on image size?',
      answer: 'Free users can upload images up to 5MB. Pro and Premium users can upload images up to 25MB.',
    },
    {
      question: 'Can I use the results commercially?',
      answer: 'Commercial use is included with Premium plans. Pro and Free users have personal use rights only.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4">
              Choose Your <span className="text-gradient">Plan</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get started for free or upgrade to unlock premium features and more credits
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 animate-fade-in-up">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative card-gradient p-8 ${
                  plan.isPopular 
                    ? 'border-2 border-primary shadow-xl scale-105' 
                    : 'border border-gray-200 dark:border-gray-700'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-gradient mb-1">
                    {plan.price}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">per {plan.period}</p>
                  <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="text-center mb-4">
                    <span className="text-3xl font-bold text-primary">{plan.credits}</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-1">credits</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.isPopular 
                      ? 'btn-gradient' 
                      : 'border border-primary text-primary hover:bg-primary hover:text-white'
                  }`}
                  variant={plan.isPopular ? 'default' : 'outline'}
                >
                  {plan.name === 'Free' ? 'Get Started' : 'Subscribe Now'}
                </Button>
              </Card>
            ))}
          </div>

          {/* One-time Credits */}
          <div className="mb-20 animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Or Buy Credits Once</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Purchase credits without a subscription - they never expire
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { credits: 25, price: '$4.99', bonus: '' },
                { credits: 50, price: '$8.99', bonus: '+5 bonus' },
                { credits: 100, price: '$15.99', bonus: '+15 bonus' },
                { credits: 250, price: '$34.99', bonus: '+50 bonus' },
              ].map((pack, index) => (
                <Card key={index} className="p-6 card-gradient text-center hover:scale-105 transition-transform">
                  <div className="text-2xl font-bold text-primary mb-2">
                    {pack.credits}
                    {pack.bonus && (
                      <span className="text-sm text-green-600 ml-1">{pack.bonus}</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">credits</div>
                  <div className="text-xl font-bold mb-4">{pack.price}</div>
                  <Button size="sm" variant="outline" className="w-full">
                    Buy Now
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Everything you need to know about our pricing and credits
              </p>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6 card-gradient">
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

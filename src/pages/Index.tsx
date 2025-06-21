
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';

const Index = () => {
  const features = [
    {
      title: 'AI-Powered Face Swapping',
      description: 'Advanced machine learning algorithms for realistic face swaps',
      icon: '🤖',
    },
    {
      title: 'Multiple Face Support',
      description: 'Swap faces with multiple people in a single image',
      icon: '👥',
    },
    {
      title: 'High Quality Results',
      description: 'Professional-grade output with fine-tuned details',
      icon: '✨',
    },
    {
      title: 'Fast Processing',
      description: 'Get your results in seconds, not minutes',
      icon: '⚡',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Transform Faces with{' '}
              <span className="text-gradient">AI Magic</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Experience the future of photo editing with our cutting-edge AI face swap technology. 
              Create stunning, realistic face swaps in seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/single-swap">
                <Button size="lg" className="btn-gradient text-lg px-8 py-4 animate-pulse-glow">
                  Start Face Swapping
                </Button>
              </Link>
              <Link to="/documentation">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Demo Image */}
            <div className="relative max-w-4xl mx-auto animate-float">
              <img
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=400&fit=crop"
                alt="Face swap demo"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our AI?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Powered by state-of-the-art technology for the best results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 card-gradient animate-fade-in hover:scale-105 transition-transform">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card-gradient p-12 rounded-3xl animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Join thousands of users creating amazing face swaps every day
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/single-swap">
                <Button size="lg" className="btn-gradient text-lg px-8 py-4">
                  Try Single Face Swap
                </Button>
              </Link>
              <Link to="/multiple-swap">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                  Try Multiple Face Swap
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

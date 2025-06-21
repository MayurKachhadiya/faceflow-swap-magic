
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Camera, Users, Code } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Documentation = () => {
  const guides = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of face swapping with our AI',
      icon: Book,
      articles: [
        'Creating your first face swap',
        'Understanding credits and pricing',
        'Tips for best results',
        'Common troubleshooting',
      ],
    },
    {
      title: 'Single Face Swap',
      description: 'Master the art of single face replacement',
      icon: Camera,
      articles: [
        'Choosing the right source image',
        'Preparing your target image',
        'Advanced editing techniques',
        'Quality optimization',
      ],
    },
    {
      title: 'Multiple Face Swap',
      description: 'Work with multiple faces in one image',
      icon: Users,
      articles: [
        'Group photo face swapping',
        'Managing multiple face sources',
        'Batch processing workflow',
        'Complex scene handling',
      ],
    },
    {
      title: 'API & Integration',
      description: 'Integrate our service into your applications',
      icon: Code,
      articles: [
        'API authentication',
        'REST API reference',
        'SDK documentation',
        'Webhook integration',
      ],
    },
  ];

  const tutorials = [
    {
      title: 'Create Your First Face Swap',
      duration: '5 min',
      difficulty: 'Beginner',
      description: 'A step-by-step guide to creating your first face swap using our single face swap feature.',
    },
    {
      title: 'Working with Group Photos',
      duration: '8 min',
      difficulty: 'Intermediate',
      description: 'Learn how to swap multiple faces in group photos and family pictures effectively.',
    },
    {
      title: 'Advanced Quality Settings',
      duration: '10 min',
      difficulty: 'Advanced',
      description: 'Optimize your face swaps for professional-quality results using advanced settings.',
    },
    {
      title: 'Using the API',
      duration: '15 min',
      difficulty: 'Advanced',
      description: 'Integrate face swap functionality into your own applications using our REST API.',
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
              Documentation & <span className="text-gradient">Guides</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to know to create amazing face swaps and integrate our AI into your projects
            </p>
          </div>

          {/* Quick Start */}
          <div className="mb-20 animate-fade-in">
            <Card className="card-gradient p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-100">
                    Quick Start Guide
                  </h2>
                  <p className="text-blue-800 dark:text-blue-200 mb-6">
                    New to FaceSwap AI? Get up and running in minutes with our comprehensive quick start guide.
                  </p>
                  <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300 mb-6">
                    <div>• Create an account and get free credits</div>
                    <div>• Upload your first images</div>
                    <div>• Generate your first face swap</div>
                    <div>• Download and share your results</div>
                  </div>
                  <Button className="btn-gradient">
                    Start Quick Tutorial
                  </Button>
                </div>
                <div className="text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop"
                    alt="Quick start guide"
                    className="rounded-lg shadow-lg animate-float"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Documentation Categories */}
          <div className="mb-20 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-center mb-12">Documentation Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {guides.map((guide, index) => (
                <Card key={index} className="p-6 card-gradient hover:scale-105 transition-transform">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <guide.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{guide.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {guide.description}
                    </p>
                  </div>
                  
                  <ul className="space-y-2 mb-4">
                    {guide.articles.map((article, articleIndex) => (
                      <li key={articleIndex} className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary cursor-pointer">
                        • {article}
                      </li>
                    ))}
                  </ul>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    View Articles
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Video Tutorials */}
          <div className="mb-20 animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-12">Video Tutorials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tutorials.map((tutorial, index) => (
                <Card key={index} className="card-gradient overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white relative">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                      <p className="text-sm opacity-90">{tutorial.duration}</p>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        tutorial.difficulty === 'Beginner' ? 'bg-green-500' :
                        tutorial.difficulty === 'Intermediate' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}>
                        {tutorial.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{tutorial.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {tutorial.description}
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Watch Tutorial
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Support Section */}
          <div className="animate-fade-in">
            <Card className="card-gradient p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                Can't find what you're looking for? Our support team is here to help you get the most out of FaceSwap AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-gradient">
                  Contact Support
                </Button>
                <Button variant="outline">
                  Join Community
                </Button>
                <Button variant="outline">
                  Report Issue
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;


import React, { useState } from 'react';
import { Eye, EyeOff, Copy, Key, BarChart3, CreditCard, Check, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface User {
  name: string;
  email: string;
}

interface DashboardHomeProps {
  user: User;
}

export const DashboardHome = ({ user }: DashboardHomeProps) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mock API key - in real app this would come from your backend
  const apiKey = 'sk_live_1234567890abcdef1234567890abcdef';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      toast.success('API key copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy API key');
    }
  };

  const stats = [
    {
      title: 'API Calls Today',
      value: '1,247',
      change: '+12%',
      icon: BarChart3,
      color: 'text-blue-600'
    },
    {
      title: 'Credits Remaining',
      value: '8,530',
      change: '-156',
      icon: CreditCard,
      color: 'text-green-600'
    },
    {
      title: 'Success Rate',
      value: '99.2%',
      change: '+0.1%',
      icon: Check,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
        <p className="text-blue-100 text-lg">
          Ready to transform faces with AI? Your API is active and ready to use.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{stat.change} from yesterday</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* API Key Section */}
      <Card className="bg-white dark:bg-gray-800 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-blue-600" />
            API Secret Key
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <p className="text-amber-800 dark:text-amber-200 text-sm font-medium mb-1">
              🔒 Keep your API key secure
            </p>
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              Use this key in the Authorization header for all API requests: <code className="bg-amber-100 dark:bg-amber-900/50 px-1 rounded">Authorization: Bearer YOUR_KEY</code>
            </p>
          </div>
          
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                readOnly
                className="pr-20 font-mono text-sm bg-gray-50 dark:bg-gray-900"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="h-8 w-8 p-0"
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="h-8 w-8 p-0"
                >
                  {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-white dark:bg-gray-800 shadow-xl">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              className="h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
              onClick={() => window.open('/api-docs', '_blank')}
            >
              <div className="text-center">
                <Book className="h-6 w-6 mx-auto mb-1" />
                <div className="font-medium">View API Docs</div>
              </div>
            </Button>
            <Button 
              variant="outline"
              className="h-16 border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <div className="text-center">
                <CreditCard className="h-6 w-6 mx-auto mb-1" />
                <div className="font-medium">Buy More Credits</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

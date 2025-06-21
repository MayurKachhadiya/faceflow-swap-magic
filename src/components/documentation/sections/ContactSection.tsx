
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ContactSection = () => (
  <section id="contact" className="mb-16">
    <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Contact & Support</h2>
    
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">Get Help</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Need help with the API? Here are the best ways to get support:
        </p>
        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
          <li>• Email: <a href="mailto:api-support@faceswap.ai" className="text-blue-600 dark:text-blue-400 hover:underline">api-support@faceswap.ai</a></li>
          <li>• Documentation: <a href="/documentation" className="text-blue-600 dark:text-blue-400 hover:underline">User Guides & Tutorials</a></li>
          <li>• Response time: Within 24 hours for technical support</li>
        </ul>
      </CardContent>
    </Card>
  </section>
);

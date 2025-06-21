
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeBlock } from '../CodeBlock';

export const AuthenticationSection = () => (
  <section id="authentication" className="mb-16">
    <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Authentication</h2>
    
    <Card className="mb-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">API Key Authentication</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          All API requests require authentication using your API key in the Authorization header.
        </p>
        <CodeBlock code="Authorization: Bearer YOUR_API_KEY" />
      </CardContent>
    </Card>

    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">Example Request</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="curl">
          <TabsList className="bg-gray-100 dark:bg-gray-700">
            <TabsTrigger value="curl" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 dark:text-gray-300">cURL</TabsTrigger>
            <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 dark:text-gray-300">JavaScript</TabsTrigger>
          </TabsList>
          <TabsContent value="curl">
            <CodeBlock code={`curl -X GET "https://api.faceswap.ai/v1/status" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`} />
          </TabsContent>
          <TabsContent value="javascript">
            <CodeBlock 
              language="javascript"
              code={`const response = await fetch('https://api.faceswap.ai/v1/status', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});`} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  </section>
);

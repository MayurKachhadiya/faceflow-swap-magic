
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '../CodeBlock';

export const IntroductionSection = () => (
  <section id="introduction" className="mb-16">
    <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">FaceSwap AI API Documentation</h1>
    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
      Integrate powerful face swapping capabilities into your applications with our REST API.
    </p>
    
    <Card className="mb-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">Base URL</CardTitle>
      </CardHeader>
      <CardContent>
        <CodeBlock code="https://api.faceswap.ai/v1" />
      </CardContent>
    </Card>

    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">Quick Start</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-gray-700 dark:text-gray-300">Get started with our API in three simple steps:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
          <li>Sign up for an API key</li>
          <li>Make your first API request</li>
          <li>Process the face swap result</li>
        </ol>
      </CardContent>
    </Card>
  </section>
);

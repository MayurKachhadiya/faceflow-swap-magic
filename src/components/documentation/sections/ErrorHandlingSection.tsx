
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusCode } from '../StatusCode';
import { CodeBlock } from '../CodeBlock';

export const ErrorHandlingSection = () => (
  <section id="error-handling" className="mb-16">
    <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Error Handling</h2>
    
    <Card className="mb-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">HTTP Status Codes</CardTitle>
      </CardHeader>
      <CardContent>
        <StatusCode code="200" description="Success - Request completed successfully" />
        <StatusCode code="201" description="Created - Face swap job created and is processing" />
        <StatusCode code="400" description="Bad Request - Invalid parameters or file format" />
        <StatusCode code="401" description="Unauthorized - Invalid or missing API key" />
        <StatusCode code="402" description="Payment Required - Insufficient credits" />
        <StatusCode code="404" description="Not Found - Face swap job not found" />
        <StatusCode code="429" description="Too Many Requests - Rate limit exceeded" />
        <StatusCode code="500" description="Internal Server Error - Server processing error" />
      </CardContent>
    </Card>

    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">Error Response Format</CardTitle>
      </CardHeader>
      <CardContent>
        <CodeBlock
          language="json"
          code={`{
  "error": {
    "code": "INVALID_IMAGE_FORMAT",
    "message": "The uploaded image format is not supported.",
    "details": {
      "supported_formats": ["jpeg", "jpg", "png", "webp"]
    }
  },
  "request_id": "req_1234567890"
}`} />
      </CardContent>
    </Card>
  </section>
);

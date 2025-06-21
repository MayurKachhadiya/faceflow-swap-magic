
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Parameter } from '../Parameter';
import { CodeBlock } from '../CodeBlock';

export const SingleFaceSwapSection = () => (
  <section id="single-face-swap" className="mb-16">
    <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Single Face Swap API</h2>
    
    <Card className="mb-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">
          <Badge className="mr-2">POST</Badge>
          /face-swap/single
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Swap a single face in an image with another face from a source image.
        </p>
        
        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Parameters</h4>
        <div className="mb-6">
          <Parameter 
            name="source_image"
            type="file"
            required={true}
            description="The image containing the face to be extracted and used for swapping"
          />
          <Parameter 
            name="target_image"
            type="file"
            required={true}
            description="The image where the face will be replaced"
          />
          <Parameter 
            name="quality"
            type="string"
            required={false}
            description="Output quality: 'standard' or 'high' (default: 'standard')"
          />
        </div>

        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Example Response</h4>
        <CodeBlock
          language="json"
          code={`{
  "id": "fs_1234567890",
  "status": "processing",
  "message": "Face swap request received and is being processed",
  "estimated_completion": "30s",
  "credits_used": 1
}`} />
      </CardContent>
    </Card>
  </section>
);

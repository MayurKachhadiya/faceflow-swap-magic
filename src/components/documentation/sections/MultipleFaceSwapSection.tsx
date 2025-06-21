
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Parameter } from '../Parameter';
import { CodeBlock } from '../CodeBlock';

export const MultipleFaceSwapSection = () => (
  <section id="multiple-face-swap" className="mb-16">
    <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Multiple Face Swap API</h2>
    
    <Card className="mb-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">
          <Badge className="mr-2">POST</Badge>
          /face-swap/multiple
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Swap multiple faces in an image with faces from different source images.
        </p>
        
        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Parameters</h4>
        <div className="mb-6">
          <Parameter 
            name="target_image"
            type="file"
            required={true}
            description="The image containing multiple faces to be replaced"
          />
          <Parameter 
            name="source_images"
            type="file[]"
            required={true}
            description="Array of source images containing faces for swapping"
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
  "id": "fsm_9876543210",
  "status": "processing",
  "message": "Multiple face swap request received",
  "estimated_completion": "60s",
  "faces_detected": 3,
  "credits_used": 3
}`} />
      </CardContent>
    </Card>
  </section>
);

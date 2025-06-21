
import React from 'react';

interface StatusCodeProps {
  code: string;
  description: string;
}

export const StatusCode = ({ code, description }: StatusCodeProps) => (
  <div className="flex items-start gap-3 mb-3">
    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono min-w-fit text-gray-900 dark:text-gray-100">{code}</code>
    <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
  </div>
);

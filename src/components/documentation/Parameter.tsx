
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ParameterProps {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export const Parameter = ({ name, type, required, description }: ParameterProps) => (
  <div className="border-b border-gray-200 dark:border-gray-700 pb-3 mb-3 last:border-b-0">
    <div className="flex items-center gap-2 mb-1">
      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-900 dark:text-gray-100">{name}</code>
      <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">{type}</Badge>
      {required && <Badge variant="destructive" className="text-xs">required</Badge>}
    </div>
    <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
  </div>
);

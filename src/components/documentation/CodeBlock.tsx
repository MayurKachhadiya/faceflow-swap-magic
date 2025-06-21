
import React from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock = ({ code, language = 'bash' }: CodeBlockProps) => (
  <pre className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 overflow-x-auto text-sm font-mono text-gray-900 dark:text-gray-100">
    <code className={`language-${language}`}>{code}</code>
  </pre>
);

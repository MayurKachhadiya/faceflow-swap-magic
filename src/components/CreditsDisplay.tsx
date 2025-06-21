
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CreditsDisplayProps {
  credits: number;
  onBuyCredits?: () => void;
}

const CreditsDisplay: React.FC<CreditsDisplayProps> = ({ credits, onBuyCredits }) => {
  return (
    <Card className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Available Credits</p>
          <p className="text-2xl font-bold text-gradient">{credits}</p>
        </div>
        {onBuyCredits && (
          <Button 
            onClick={onBuyCredits}
            size="sm" 
            variant="outline"
            className="border-purple-300 hover:bg-purple-50 dark:border-purple-700 dark:hover:bg-purple-900/20"
          >
            Buy More
          </Button>
        )}
      </div>
    </Card>
  );
};

export default CreditsDisplay;

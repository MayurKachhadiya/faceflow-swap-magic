
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';

interface FaceSwapResultProps {
  resultImage?: string;
  isProcessing?: boolean;
  onDownload?: () => void;
  onShare?: () => void;
}

const FaceSwapResult: React.FC<FaceSwapResultProps> = ({
  resultImage,
  isProcessing = false,
  onDownload,
  onShare,
}) => {
  return (
    <Card className="p-6 card-gradient">
      <h3 className="text-lg font-semibold mb-4">Result</h3>
      
      <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4">
        {isProcessing ? (
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-2 mx-auto"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Processing your face swap...</p>
          </div>
        ) : resultImage ? (
          <img
            src={resultImage}
            alt="Face swap result"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-2 mx-auto">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Your result will appear here</p>
          </div>
        )}
      </div>
      
      {resultImage && (
        <div className="flex space-x-2">
          <Button onClick={onDownload} className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button onClick={onShare} variant="outline" className="flex-1">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      )}
    </Card>
  );
};

export default FaceSwapResult;

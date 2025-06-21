
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import ImageUpload from '@/components/ImageUpload';
import FaceSwapResult from '@/components/FaceSwapResult';
import CreditsDisplay from '@/components/CreditsDisplay';

const SingleSwap = () => {
  const [sourceImage, setSourceImage] = useState<File | null>(null);
  const [targetImage, setTargetImage] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [credits, setCredits] = useState(50);

  const handleSwap = async () => {
    if (!sourceImage || !targetImage) return;
    
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      setResultImage('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop');
      setIsProcessing(false);
      setCredits(credits - 1);
    }, 3000);
  };

  const canSwap = sourceImage && targetImage && credits > 0 && !isProcessing;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4">
              Single Face <span className="text-gradient">Swap</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Upload two images and let our AI swap the faces seamlessly. Perfect for creating fun photos and memes.
            </p>
          </div>

          {/* Credits Display */}
          <div className="mb-8 max-w-sm mx-auto animate-fade-in">
            <CreditsDisplay credits={credits} />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up">
            {/* Source Image Upload */}
            <div className="space-y-4">
              <ImageUpload
                title="Source Face"
                description="Upload the image containing the face you want to use"
                onImageSelect={setSourceImage}
                selectedImage={sourceImage}
                onRemoveImage={() => setSourceImage(null)}
              />
            </div>

            {/* Target Image Upload */}
            <div className="space-y-4">
              <ImageUpload
                title="Target Image"
                description="Upload the image where you want to place the face"
                onImageSelect={setTargetImage}
                selectedImage={targetImage}
                onRemoveImage={() => setTargetImage(null)}
              />
            </div>

            {/* Result */}
            <div className="space-y-4">
              <FaceSwapResult
                resultImage={resultImage}
                isProcessing={isProcessing}
                onDownload={() => console.log('Download result')}
                onShare={() => console.log('Share result')}
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="mt-8 text-center">
            <Button
              onClick={handleSwap}
              disabled={!canSwap}
              size="lg"
              className="btn-gradient text-lg px-12 py-4 animate-pulse-glow"
            >
              {isProcessing ? 'Processing...' : 'Swap Faces (1 Credit)'}
            </Button>
            
            {!sourceImage || !targetImage ? (
              <p className="text-sm text-gray-500 mt-2">
                Please upload both images to continue
              </p>
            ) : credits === 0 ? (
              <p className="text-sm text-red-500 mt-2">
                No credits remaining. Please purchase more credits.
              </p>
            ) : null}
          </div>

          {/* Tips */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">
                Tips for Best Results
              </h3>
              <ul className="space-y-2 text-blue-800 dark:text-blue-200">
                <li>• Use high-quality images with clear, well-lit faces</li>
                <li>• Ensure faces are facing forward and not at extreme angles</li>
                <li>• Avoid images with sunglasses or face coverings</li>
                <li>• Images with similar lighting conditions work best</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSwap;

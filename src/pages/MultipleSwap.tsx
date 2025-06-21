
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import ImageUpload from '@/components/ImageUpload';
import FaceSwapResult from '@/components/FaceSwapResult';
import CreditsDisplay from '@/components/CreditsDisplay';
import { Plus, X } from 'lucide-react';

const MultipleSwap = () => {
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [faceImages, setFaceImages] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [credits, setCredits] = useState(50);

  const addFaceImage = (file: File) => {
    setFaceImages([...faceImages, file]);
  };

  const removeFaceImage = (index: number) => {
    setFaceImages(faceImages.filter((_, i) => i !== index));
  };

  const handleSwap = async () => {
    if (!mainImage || faceImages.length === 0) return;
    
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      setResultImage('https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop');
      setIsProcessing(false);
      setCredits(credits - faceImages.length);
    }, 4000);
  };

  const creditsNeeded = faceImages.length;
  const canSwap = mainImage && faceImages.length > 0 && credits >= creditsNeeded && !isProcessing;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4">
              Multiple Face <span className="text-gradient">Swap</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Swap multiple faces in a single image. Perfect for group photos and family pictures.
            </p>
          </div>

          {/* Credits Display */}
          <div className="mb-8 max-w-sm mx-auto animate-fade-in">
            <CreditsDisplay credits={credits} />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 animate-fade-in-up">
            {/* Main Image Upload */}
            <div>
              <ImageUpload
                title="Main Image"
                description="Upload the image containing multiple faces you want to swap"
                onImageSelect={setMainImage}
                selectedImage={mainImage}
                onRemoveImage={() => setMainImage(null)}
              />
            </div>

            {/* Result */}
            <div>
              <FaceSwapResult
                resultImage={resultImage}
                isProcessing={isProcessing}
                onDownload={() => console.log('Download result')}
                onShare={() => console.log('Share result')}
              />
            </div>
          </div>

          {/* Face Images Section */}
          <div className="mb-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Face Sources</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add the faces you want to swap into the main image. Each face will cost 1 credit.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {faceImages.map((image, index) => (
                <Card key={index} className="p-4 card-gradient relative">
                  <Button
                    onClick={() => removeFaceImage(index)}
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 z-10"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Face ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                    Face {index + 1}
                  </p>
                </Card>
              ))}
              
              {faceImages.length < 5 && (
                <Card className="p-4 card-gradient">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) addFaceImage(file);
                      }}
                      className="hidden"
                    />
                    <div className="w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-colors">
                      <div className="text-center">
                        <Plus className="w-8 h-8 text-gray-400 mb-2 mx-auto" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">Add Face</p>
                      </div>
                    </div>
                  </label>
                </Card>
              )}
            </div>
          </div>

          {/* Swap Button */}
          <div className="text-center mb-8">
            <Button
              onClick={handleSwap}
              disabled={!canSwap}
              size="lg"
              className="btn-gradient text-lg px-12 py-4 animate-pulse-glow"
            >
              {isProcessing 
                ? 'Processing...' 
                : `Swap Faces (${creditsNeeded} Credit${creditsNeeded !== 1 ? 's' : ''})`
              }
            </Button>
            
            {!mainImage ? (
              <p className="text-sm text-gray-500 mt-2">
                Please upload a main image to continue
              </p>
            ) : faceImages.length === 0 ? (
              <p className="text-sm text-gray-500 mt-2">
                Please add at least one face source
              </p>
            ) : credits < creditsNeeded ? (
              <p className="text-sm text-red-500 mt-2">
                Not enough credits. You need {creditsNeeded} credits but have {credits}.
              </p>
            ) : null}
          </div>

          {/* Tips */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
              <h3 className="text-lg font-semibold mb-3 text-purple-900 dark:text-purple-100">
                Tips for Multiple Face Swap
              </h3>
              <ul className="space-y-2 text-purple-800 dark:text-purple-200">
                <li>• The main image should contain multiple clear faces</li>
                <li>• Each face source image should contain only one face</li>
                <li>• Faces will be swapped automatically based on position and size</li>
                <li>• Use similar lighting and angles for best results</li>
                <li>• Maximum 5 face swaps per image</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleSwap;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ImageUpload from "@/components/ImageUpload";
import { ArrowDown } from "lucide-react";

const SingleFaceSwap = () => {
  const [sourceImage, setSourceImage] = useState<File | null>(null);
  const [targetImage, setTargetImage] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSwap = async () => {
    if (!sourceImage || !targetImage) return;
    
    setIsProcessing(true);
    // Simulate processing time
    setTimeout(() => {
      setResult("https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop");
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Single Face Swap
          </h1>
          <p className="text-lg text-muted-foreground">
            Upload two photos and swap faces with AI precision
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Source Face</h3>
            <ImageUpload
              title="Source Face"
              description="Upload the image containing the face you want to use"
              onImageSelect={setSourceImage}
              selectedImage={sourceImage}
              onRemoveImage={() => setSourceImage(null)}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Target Image</h3>
            <ImageUpload
              title="Target Image"
              description="Upload the image where you want to place the face"
              onImageSelect={setTargetImage}
              selectedImage={targetImage}
              onRemoveImage={() => setTargetImage(null)}
            />
          </div>
        </div>

        <div className="text-center mb-8">
          <Button
            onClick={handleSwap}
            disabled={!sourceImage || !targetImage || isProcessing}
            size="lg"
            className="px-8 py-6 text-lg"
          >
            {isProcessing ? "Processing..." : "Swap Faces"}
          </Button>
        </div>

        {(isProcessing || result) && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowDown className="h-5 w-5" />
                Result
              </CardTitle>
              <CardDescription>
                Your face swap result will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isProcessing ? (
                <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p>Processing your face swap...</p>
                  </div>
                </div>
              ) : result ? (
                <div className="text-center">
                  <img
                    src={result}
                    alt="Face swap result"
                    className="max-w-full h-auto rounded-lg mx-auto"
                  />
                  <div className="mt-4 space-x-4">
                    <Button variant="outline">Download</Button>
                    <Button variant="outline">Share</Button>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SingleFaceSwap;

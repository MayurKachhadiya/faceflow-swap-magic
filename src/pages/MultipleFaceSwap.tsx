
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ImageUpload from "@/components/ImageUpload";
import { Users, Plus } from "lucide-react";

const MultipleFaceSwap = () => {
  const [groupImage, setGroupImage] = useState<File | null>(null);
  const [faceImages, setFaceImages] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const addFaceImage = (file: File) => {
    setFaceImages([...faceImages, file]);
  };

  const removeFaceImage = (index: number) => {
    setFaceImages(faceImages.filter((_, i) => i !== index));
  };

  const handleSwap = async () => {
    if (!groupImage || faceImages.length === 0) return;
    
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
    }, 4000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Multiple Face Swap
          </h1>
          <p className="text-lg text-muted-foreground">
            Swap multiple faces in group photos with advanced AI processing
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Group Photo
            </h3>
            <ImageUpload
              title="Group Photo"
              description="Upload the image containing multiple faces you want to swap"
              onImageSelect={setGroupImage}
              selectedImage={groupImage}
              onRemoveImage={() => setGroupImage(null)}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Face Sources</h3>
            <div className="grid gap-4 grid-cols-2">
              {faceImages.map((_, index) => (
                <div key={index} className="relative">
                  <Card>
                    <CardContent className="p-4">
                      <div className="aspect-square bg-muted rounded flex items-center justify-center">
                        <span className="text-sm text-muted-foreground">Face {index + 1}</span>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full mt-2"
                        onClick={() => removeFaceImage(index)}
                      >
                        Remove
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
              
              {faceImages.length < 6 && (
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardContent className="p-4">
                    <div 
                      className="aspect-square border-2 border-dashed border-muted-foreground/25 rounded flex items-center justify-center"
                      onClick={() => document.getElementById('face-upload')?.click()}
                    >
                      <Plus className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-center mt-2 text-muted-foreground">
                      Add Face
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <input
              id="face-upload"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) addFaceImage(file);
              }}
              className="hidden"
            />
          </div>
        </div>

        <div className="text-center mb-8">
          <Button
            onClick={handleSwap}
            disabled={!groupImage || faceImages.length === 0 || isProcessing}
            size="lg"
            className="px-8 py-6 text-lg"
          >
            {isProcessing ? "Processing Multiple Faces..." : "Swap All Faces"}
          </Button>
        </div>

        {isProcessing && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Processing</CardTitle>
              <CardDescription>
                Processing multiple face swaps may take longer...
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p>Processing {faceImages.length} face swaps...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MultipleFaceSwap;

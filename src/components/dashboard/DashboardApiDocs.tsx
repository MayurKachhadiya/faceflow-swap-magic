import React, { useState } from 'react';
import { Send, Upload, Code, Copy, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export const DashboardApiDocs = () => {
  const [activeEndpoint, setActiveEndpoint] = useState('single-swap');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    sourceImage: null,
    targetImage: null,
    sourceImages: null
  });
  const [fileErrors, setFileErrors] = useState<{ [key: string]: string }>({});

  const endpoints = [
    {
      id: 'single-swap',
      title: 'Single Face Swap',
      method: 'POST',
      path: '/api/face-swap/single',
      description: 'Swap a single face in an image with another face from a source image'
    },
    {
      id: 'multiple-swap',
      title: 'Multiple Face Swap',
      method: 'POST',
      path: '/api/face-swap/multiple',
      description: 'Swap multiple faces in an image with faces from different source images'
    }
  ];

  const validateImageFile = async (file: File): Promise<string | null> => {
    // Check file type - only allow JPG and PNG
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      return 'Please upload a valid JPG or PNG image file';
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      return 'Image file size must be less than 10MB';
    }

    // Check if it's actually an image by checking the file signature
    return new Promise<string | null>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arr = new Uint8Array(e.target?.result as ArrayBuffer).subarray(0, 4);
        let header = '';
        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }
        
        // Check for JPG and PNG file signatures only
        const imageSignatures = [
          'ffd8ff', // JPEG
          '89504e47', // PNG
        ];
        
        const isValidImage = imageSignatures.some(sig => header.startsWith(sig));
        resolve(isValidImage ? null : 'File does not appear to be a valid JPG or PNG image');
      };
      reader.onerror = () => resolve('Error reading file');
      reader.readAsArrayBuffer(file.slice(0, 4));
    });
  };

  const handleFileUpload = async (key: string, file: File | null) => {
    if (!file) {
      setFiles(prev => ({ ...prev, [key]: null }));
      setFileErrors(prev => ({ ...prev, [key]: '' }));
      return;
    }

    // Validate the file
    const validationError = await validateImageFile(file);
    
    if (validationError) {
      setFileErrors(prev => ({ ...prev, [key]: validationError }));
      return;
    }

    // File is valid
    setFiles(prev => ({ ...prev, [key]: file }));
    setFileErrors(prev => ({ ...prev, [key]: '' }));
    toast.success(`${file.name} uploaded successfully!`);
  };

  const handleTestRequest = async () => {
    setIsLoading(true);
    setResponse(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful response
      const mockResponse = {
        success: true,
        data: {
          id: `fs_${Date.now()}`,
          status: 'completed',
          result_url: 'https://example.com/result.jpg',
          processing_time: '1.2s',
          credits_used: activeEndpoint === 'single-swap' ? 1 : 3
        }
      };
      
      setResponse(mockResponse);
      toast.success('API request completed successfully!');
    } catch (error) {
      const errorResponse = {
        success: false,
        error: {
          code: 'PROCESSING_ERROR',
          message: 'Failed to process the face swap request'
        }
      };
      setResponse(errorResponse);
      toast.error('API request failed');
    } finally {
      setIsLoading(false);
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard!');
  };

  const currentEndpoint = endpoints.find(ep => ep.id === activeEndpoint);

  const generateCurlCode = () => {
    return `curl -X POST "${currentEndpoint?.path}" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "source_image=@source.jpg" \\
  -F "target_image=@target.jpg" \\
  ${activeEndpoint === 'multiple-swap' ? '-F "source_images[]=@face1.jpg" \\\n  -F "source_images[]=@face2.jpg" \\' : ''}
  -F "quality=high"`;
  };

  const generateJavaScriptCode = () => {
    return `const formData = new FormData();
formData.append('source_image', sourceImageFile);
formData.append('target_image', targetImageFile);
${activeEndpoint === 'multiple-swap' ? `formData.append('source_images[]', face1File);
formData.append('source_images[]', face2File);` : ''}
formData.append('quality', 'high');

const response = await fetch('${currentEndpoint?.path}', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: formData
});

const result = await response.json();
console.log(result);`;
  };

  const isFormValid = () => {
    const hasRequiredFiles = files.sourceImage && files.targetImage;
    const hasNoErrors = Object.values(fileErrors).every(error => !error);
    return hasRequiredFiles && hasNoErrors;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">API Documentation</h1>
        <p className="text-emerald-100 text-lg">
          Test your API endpoints interactively with live responses
        </p>
      </div>

      {/* Endpoint Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {endpoints.map((endpoint) => (
          <Card 
            key={endpoint.id}
            className={`cursor-pointer transition-all duration-200 ${
              activeEndpoint === endpoint.id 
                ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'hover:shadow-lg'
            }`}
            onClick={() => setActiveEndpoint(endpoint.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="text-xs font-mono">
                  {endpoint.method}
                </Badge>
                <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  {endpoint.path}
                </code>
              </div>
              <h3 className="font-semibold text-lg mb-1">{endpoint.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {endpoint.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* API Testing Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Panel */}
        <Card className="bg-white dark:bg-gray-800 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-blue-600" />
              Test Request
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* File Uploads */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="source-image">Source Image *</Label>
                <Input
                  id="source-image"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload('sourceImage', e.target.files?.[0] || null)}
                  className="mt-1"
                />
                {fileErrors.sourceImage && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-red-600 dark:text-red-400">
                    <AlertTriangle className="h-4 w-4" />
                    {fileErrors.sourceImage}
                  </div>
                )}
                {files.sourceImage && !fileErrors.sourceImage && (
                  <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                    ✓ {files.sourceImage.name} ({(files.sourceImage.size / 1024 / 1024).toFixed(2)} MB)
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="target-image">Target Image *</Label>
                <Input
                  id="target-image"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload('targetImage', e.target.files?.[0] || null)}
                  className="mt-1"
                />
                {fileErrors.targetImage && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-red-600 dark:text-red-400">
                    <AlertTriangle className="h-4 w-4" />
                    {fileErrors.targetImage}
                  </div>
                )}
                {files.targetImage && !fileErrors.targetImage && (
                  <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                    ✓ {files.targetImage.name} ({(files.targetImage.size / 1024 / 1024).toFixed(2)} MB)
                  </div>
                )}
              </div>

              {activeEndpoint === 'multiple-swap' && (
                <div>
                  <Label htmlFor="source-images">Additional Source Images</Label>
                  <Input
                    id="source-images"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    multiple
                    onChange={(e) => handleFileUpload('sourceImages', e.target.files?.[0] || null)}
                    className="mt-1"
                  />
                  {fileErrors.sourceImages && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-red-600 dark:text-red-400">
                      <AlertTriangle className="h-4 w-4" />
                      {fileErrors.sourceImages}
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: JPG, PNG (Max: 10MB each)
                  </p>
                </div>
              )}
            </div>

            {/* File Upload Guidelines */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">File Requirements</h4>
              <ul className="text-sm text-blue-700 dark:text-blue-200 space-y-1">
                <li>• Supported formats: JPG, PNG only</li>
                <li>• Maximum file size: 10MB per image</li>
                <li>• Recommended resolution: 512x512 to 2048x2048 pixels</li>
                <li>• Clear, well-lit faces work best</li>
              </ul>
            </div>

            {/* Parameters */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="quality">Quality</Label>
                <select 
                  id="quality"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-background"
                >
                  <option value="standard">Standard</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            {/* Send Request Button */}
            <Button 
              onClick={handleTestRequest}
              disabled={isLoading || !isFormValid()}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Request
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Response Panel */}
        <Card className="bg-white dark:bg-gray-800 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-green-600" />
              Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            {response ? (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${
                  response.success 
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={response.success ? "default" : "destructive"}>
                      {response.success ? '200 OK' : '400 Error'}
                    </Badge>
                  </div>
                  <pre className="text-sm overflow-auto">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Click "Send Request" to see the response here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Code Samples */}
      <Card className="bg-white dark:bg-gray-800 shadow-xl">
        <CardHeader>
          <CardTitle>Code Samples</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="curl" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="curl">cURL</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            </TabsList>
            <TabsContent value="curl" className="space-y-4">
              <div className="relative">
                <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm overflow-auto">
                  {generateCurlCode()}
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyCode(generateCurlCode())}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="javascript" className="space-y-4">
              <div className="relative">
                <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm overflow-auto">
                  {generateJavaScriptCode()}
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyCode(generateJavaScriptCode())}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

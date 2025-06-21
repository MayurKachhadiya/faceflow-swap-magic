
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarProvider, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel
} from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Code, Book, Key, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';

const ApiDocumentation = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const navigationItems = [
    { id: 'overview', title: 'Overview', icon: Book },
    { id: 'authentication', title: 'Authentication', icon: Key },
    { id: 'single-face-swap', title: 'Single Face Swap', icon: Code },
    { id: 'multiple-face-swap', title: 'Multiple Face Swap', icon: Code },
    { id: 'errors', title: 'Error Codes', icon: AlertCircle },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const CodeBlock = ({ code, language = 'bash' }: { code: string; language?: string }) => (
    <pre className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 overflow-x-auto text-sm font-mono text-gray-900 dark:text-gray-100">
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );

  const Parameter = ({ name, type, required, description }: { 
    name: string; 
    type: string; 
    required: boolean; 
    description: string; 
  }) => (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-3 mb-3 last:border-b-0">
      <div className="flex items-center gap-2 mb-1">
        <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-900 dark:text-gray-100">{name}</code>
        <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">{type}</Badge>
        {required && <Badge variant="destructive" className="text-xs">required</Badge>}
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
    </div>
  );

  const StatusCode = ({ code, description }: { code: string; description: string }) => (
    <div className="flex items-start gap-3 mb-3">
      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono min-w-fit text-gray-900 dark:text-gray-100">{code}</code>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <SidebarProvider>
        <div className="flex w-full pt-16">
          {/* Sidebar */}
          <Sidebar className="w-64 border-r bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel className="px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white">
                  API Documentation
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {navigationItems.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          onClick={() => scrollToSection(item.id)}
                          isActive={activeSection === item.id}
                          className="w-full justify-start text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white data-[active=true]:bg-primary/10 data-[active=true]:text-primary dark:data-[active=true]:text-primary"
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          {/* Main Content */}
          <div className="flex-1 bg-white dark:bg-gray-900">
            <ScrollArea className="h-screen">
              <div className="max-w-4xl mx-auto p-8">
                {/* Overview Section */}
                <section id="overview" className="mb-12">
                  <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">FaceSwap AI API Documentation</h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                    Integrate powerful face swapping capabilities into your applications with our REST API.
                  </p>
                  
                  <Card className="mb-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white">Base URL</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CodeBlock code="https://api.faceswap.ai/v1" />
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white">Quick Start</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-gray-700 dark:text-gray-300">Get started with our API in three simple steps:</p>
                      <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                        <li>Sign up for an API key</li>
                        <li>Make your first API request</li>
                        <li>Process the face swap result</li>
                      </ol>
                    </CardContent>
                  </Card>
                </section>

                {/* Authentication Section */}
                <section id="authentication" className="mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Authentication</h2>
                  
                  <Card className="mb-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white">API Key Authentication</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-gray-700 dark:text-gray-300">
                        All API requests require authentication using your API key in the Authorization header.
                      </p>
                      <CodeBlock code="Authorization: Bearer YOUR_API_KEY" />
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white">Example Request</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="curl">
                        <TabsList className="bg-gray-100 dark:bg-gray-700">
                          <TabsTrigger value="curl" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 dark:text-gray-300">cURL</TabsTrigger>
                          <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 dark:text-gray-300">JavaScript</TabsTrigger>
                        </TabsList>
                        <TabsContent value="curl">
                          <CodeBlock code={`curl -X GET "https://api.faceswap.ai/v1/status" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`} />
                        </TabsContent>
                        <TabsContent value="javascript">
                          <CodeBlock 
                            language="javascript"
                            code={`const response = await fetch('https://api.faceswap.ai/v1/status', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});`} />
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </section>

                {/* Single Face Swap Section */}
                <section id="single-face-swap" className="mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Single Face Swap API</h2>
                  
                  <Card className="mb-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white">
                        <Badge className="mr-2">POST</Badge>
                        /face-swap/single
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-gray-700 dark:text-gray-300">
                        Swap a single face in an image with another face from a source image.
                      </p>
                      
                      <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Parameters</h4>
                      <div className="mb-6">
                        <Parameter 
                          name="source_image"
                          type="file"
                          required={true}
                          description="The image containing the face to be extracted and used for swapping"
                        />
                        <Parameter 
                          name="target_image"
                          type="file"
                          required={true}
                          description="The image where the face will be replaced"
                        />
                        <Parameter 
                          name="quality"
                          type="string"
                          required={false}
                          description="Output quality: 'standard' or 'high' (default: 'standard')"
                        />
                        <Parameter 
                          name="webhook_url"
                          type="string"
                          required={false}
                          description="URL to receive the result via webhook when processing is complete"
                        />
                      </div>

                      <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Example Request</h4>
                      <Tabs defaultValue="curl">
                        <TabsList className="bg-gray-100 dark:bg-gray-700">
                          <TabsTrigger value="curl" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 dark:text-gray-300">cURL</TabsTrigger>
                          <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 dark:text-gray-300">JavaScript</TabsTrigger>
                        </TabsList>
                        <TabsContent value="curl">
                          <CodeBlock code={`curl -X POST "https://api.faceswap.ai/v1/face-swap/single" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "source_image=@/path/to/source.jpg" \\
  -F "target_image=@/path/to/target.jpg" \\
  -F "quality=high"`} />
                        </TabsContent>
                        <TabsContent value="javascript">
                          <CodeBlock 
                            language="javascript"
                            code={`const formData = new FormData();
formData.append('source_image', sourceImageFile);
formData.append('target_image', targetImageFile);
formData.append('quality', 'high');

const response = await fetch('https://api.faceswap.ai/v1/face-swap/single', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: formData
});`} />
                        </TabsContent>
                      </Tabs>

                      <h4 className="font-semibold mb-3 mt-6 text-gray-900 dark:text-white">Example Response</h4>
                      <CodeBlock
                        language="json"
                        code={`{
  "id": "fs_1234567890",
  "status": "processing",
  "message": "Face swap request received and is being processed",
  "estimated_completion": "30s",
  "credits_used": 1,
  "webhook_url": "https://your-app.com/webhook"
}`} />
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white">Get Single Face Swap Result</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-gray-700 dark:text-gray-300">
                        <Badge className="mr-2">GET</Badge>
                        /face-swap/single/{'{id}'}
                      </p>
                      
                      <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Example Response</h4>
                      <CodeBlock
                        language="json"
                        code={`{
  "id": "fs_1234567890",
  "status": "completed",
  "result_url": "https://cdn.faceswap.ai/results/fs_1234567890.jpg",
  "processing_time": "28s",
  "credits_used": 1,
  "created_at": "2024-01-15T10:30:00Z",
  "expires_at": "2024-01-22T10:30:00Z"
}`} />
                    </CardContent>
                  </Card>
                </section>

                {/* Multiple Face Swap Section */}
                <section id="multiple-face-swap" className="mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Multiple Face Swap API</h2>
                  
                  <Card className="mb-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white">
                        <Badge className="mr-2">POST</Badge>
                        /face-swap/multiple
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-gray-700 dark:text-gray-300">
                        Swap multiple faces in an image with faces from different source images.
                      </p>
                      
                      <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Parameters</h4>
                      <div className="mb-6">
                        <Parameter 
                          name="target_image"
                          type="file"
                          required={true}
                          description="The image containing multiple faces to be replaced"
                        />
                        <Parameter 
                          name="source_images"
                          type="file[]"
                          required={true}
                          description="Array of source images containing faces for swapping"
                        />
                        <Parameter 
                          name="face_mappings"
                          type="array"
                          required={false}
                          description="Optional array specifying which source face maps to which target face"
                        />
                        <Parameter 
                          name="quality"
                          type="string"
                          required={false}
                          description="Output quality: 'standard' or 'high' (default: 'standard')"
                        />
                        <Parameter 
                          name="webhook_url"
                          type="string"
                          required={false}
                          description="URL to receive the result via webhook when processing is complete"
                        />
                      </div>

                      <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Example Request</h4>
                      <Tabs defaultValue="curl">
                        <TabsList className="bg-gray-100 dark:bg-gray-700">
                          <TabsTrigger value="curl" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 dark:text-gray-300">cURL</TabsTrigger>
                          <TabsTrigger value="javascript" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 dark:text-gray-300">JavaScript</TabsTrigger>
                        </TabsList>
                        <TabsContent value="curl">
                          <CodeBlock code={`curl -X POST "https://api.faceswap.ai/v1/face-swap/multiple" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "target_image=@/path/to/group.jpg" \\
  -F "source_images=@/path/to/face1.jpg" \\
  -F "source_images=@/path/to/face2.jpg" \\
  -F "quality=high"`} />
                        </TabsContent>
                        <TabsContent value="javascript">
                          <CodeBlock 
                            language="javascript"
                            code={`const formData = new FormData();
formData.append('target_image', targetImageFile);
sourceImages.forEach(image => {
  formData.append('source_images', image);
});
formData.append('quality', 'high');

const response = await fetch('https://api.faceswap.ai/v1/face-swap/multiple', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: formData
});`} />
                        </TabsContent>
                      </Tabs>

                      <h4 className="font-semibold mb-3 mt-6 text-gray-900 dark:text-white">Example Response</h4>
                      <CodeBlock
                        language="json"
                        code={`{
  "id": "fsm_9876543210",
  "status": "processing",
  "message": "Multiple face swap request received and is being processed",
  "estimated_completion": "60s",
  "faces_detected": 3,
  "source_images_count": 2,
  "credits_used": 3,
  "webhook_url": "https://your-app.com/webhook"
}`} />
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white">Get Multiple Face Swap Result</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-gray-700 dark:text-gray-300">
                        <Badge className="mr-2">GET</Badge>
                        /face-swap/multiple/{'{id}'}
                      </p>
                      
                      <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Example Response</h4>
                      <CodeBlock
                        language="json"
                        code={`{
  "id": "fsm_9876543210",
  "status": "completed",
  "result_url": "https://cdn.faceswap.ai/results/fsm_9876543210.jpg",
  "processing_time": "52s",
  "faces_processed": 3,
  "credits_used": 3,
  "face_mappings": [
    {"source_index": 0, "target_face": 1},
    {"source_index": 1, "target_face": 2},
    {"source_index": 0, "target_face": 3}
  ],
  "created_at": "2024-01-15T10:30:00Z",
  "expires_at": "2024-01-22T10:30:00Z"
}`} />
                    </CardContent>
                  </Card>
                </section>

                {/* Error Codes Section */}
                <section id="errors" className="mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Error Codes</h2>
                  
                  <Card className="mb-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white">HTTP Status Codes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <StatusCode code="200" description="Success - Request completed successfully" />
                      <StatusCode code="201" description="Created - Face swap job created and is processing" />
                      <StatusCode code="400" description="Bad Request - Invalid parameters or file format" />
                      <StatusCode code="401" description="Unauthorized - Invalid or missing API key" />
                      <StatusCode code="402" description="Payment Required - Insufficient credits" />
                      <StatusCode code="404" description="Not Found - Face swap job not found" />
                      <StatusCode code="413" description="Payload Too Large - File size exceeds limit (max 10MB)" />
                      <StatusCode code="429" description="Too Many Requests - Rate limit exceeded" />
                      <StatusCode code="500" description="Internal Server Error - Server processing error" />
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white">Error Response Format</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CodeBlock
                        language="json"
                        code={`{
  "error": {
    "code": "INVALID_IMAGE_FORMAT",
    "message": "The uploaded image format is not supported. Please use JPEG, PNG, or WEBP.",
    "details": {
      "supported_formats": ["jpeg", "jpg", "png", "webp"],
      "uploaded_format": "gif"
    }
  },
  "request_id": "req_1234567890"
}`} />

                      <h4 className="font-semibold mb-3 mt-6 text-gray-900 dark:text-white">Common Error Codes</h4>
                      <div className="space-y-3">
                        <div>
                          <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-900 dark:text-gray-100">INVALID_API_KEY</code>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">The provided API key is invalid or expired</p>
                        </div>
                        <div>
                          <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-900 dark:text-gray-100">INSUFFICIENT_CREDITS</code>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">Your account doesn't have enough credits for this operation</p>
                        </div>
                        <div>
                          <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-900 dark:text-gray-100">NO_FACE_DETECTED</code>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">No faces were detected in the uploaded image</p>
                        </div>
                        <div>
                          <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-900 dark:text-gray-100">PROCESSING_FAILED</code>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">Face swap processing failed due to technical issues</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>
              </div>
            </ScrollArea>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default ApiDocumentation;

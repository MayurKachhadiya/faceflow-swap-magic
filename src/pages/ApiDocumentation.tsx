
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Code, Book, Key, AlertCircle, Mail, Menu, X } from 'lucide-react';
import Navbar from '@/components/Navbar';

const ApiDocumentation = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const navigationItems = [
    { id: 'introduction', title: 'Introduction', icon: Book },
    { id: 'authentication', title: 'Authentication', icon: Key },
    { id: 'single-face-swap', title: 'Single Face Swap API', icon: Code },
    { id: 'multiple-face-swap', title: 'Multiple Face Swap API', icon: Code },
    { id: 'error-handling', title: 'Error Handling', icon: AlertCircle },
    { id: 'contact', title: 'Contact', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileSidebarOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64;
      const targetPosition = element.offsetTop - navbarHeight - 20;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-16 flex w-full relative">
        {/* Mobile Sidebar Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-20 left-4 z-50 lg:hidden bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        >
          {isMobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>

        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">API Documentation</h2>
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-lg transition-colors
                    ${activeSection === item.id 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-medium' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 min-h-screen">
          <div className="max-w-4xl mx-auto px-6 py-8 lg:px-8">
            {/* Introduction Section */}
            <section id="introduction" className="mb-16">
              <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">FaceSwap AI API Documentation</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
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
            <section id="authentication" className="mb-16">
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
            <section id="single-face-swap" className="mb-16">
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
                  </div>

                  <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Example Response</h4>
                  <CodeBlock
                    language="json"
                    code={`{
  "id": "fs_1234567890",
  "status": "processing",
  "message": "Face swap request received and is being processed",
  "estimated_completion": "30s",
  "credits_used": 1
}`} />
                </CardContent>
              </Card>
            </section>

            {/* Multiple Face Swap Section */}
            <section id="multiple-face-swap" className="mb-16">
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
                      name="quality"
                      type="string"
                      required={false}
                      description="Output quality: 'standard' or 'high' (default: 'standard')"
                    />
                  </div>

                  <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Example Response</h4>
                  <CodeBlock
                    language="json"
                    code={`{
  "id": "fsm_9876543210",
  "status": "processing",
  "message": "Multiple face swap request received",
  "estimated_completion": "60s",
  "faces_detected": 3,
  "credits_used": 3
}`} />
                </CardContent>
              </Card>
            </section>

            {/* Error Handling Section */}
            <section id="error-handling" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Error Handling</h2>
              
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
    "message": "The uploaded image format is not supported.",
    "details": {
      "supported_formats": ["jpeg", "jpg", "png", "webp"]
    }
  },
  "request_id": "req_1234567890"
}`} />
                </CardContent>
              </Card>
            </section>

            {/* Contact Section */}
            <section id="contact" className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Contact & Support</h2>
              
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Get Help</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Need help with the API? Here are the best ways to get support:
                  </p>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• Email: <a href="mailto:api-support@faceswap.ai" className="text-blue-600 dark:text-blue-400 hover:underline">api-support@faceswap.ai</a></li>
                    <li>• Documentation: <a href="/documentation" className="text-blue-600 dark:text-blue-400 hover:underline">User Guides & Tutorials</a></li>
                    <li>• Response time: Within 24 hours for technical support</li>
                  </ul>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ApiDocumentation;

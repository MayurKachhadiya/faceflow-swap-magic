
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Image, Users } from "lucide-react";

const Documentation = () => {
  const guides = [
    {
      title: "Getting Started",
      description: "Learn the basics of face swapping with our platform",
      icon: FileText,
      content: [
        "Create your account and log in",
        "Upload your first images",
        "Perform your first face swap",
        "Download and share your results"
      ]
    },
    {
      title: "Single Face Swap Guide",
      description: "Master the art of single face swapping",
      icon: Image,
      content: [
        "Choose high-quality source images",
        "Select clear, well-lit photos",
        "Position faces properly in frame",
        "Optimize for best results"
      ]
    },
    {
      title: "Multiple Face Swap Guide",
      description: "Handle complex group photo transformations",
      icon: Users,
      content: [
        "Prepare group photos effectively",
        "Manage multiple source faces",
        "Handle different lighting conditions",
        "Process large group images"
      ]
    }
  ];

  const tips = [
    {
      title: "Image Quality",
      tip: "Use high-resolution images (at least 512x512) for best results"
    },
    {
      title: "Lighting",
      tip: "Ensure faces are well-lit and clearly visible"
    },
    {
      title: "Angle",
      tip: "Front-facing or slight angle photos work best"
    },
    {
      title: "Background",
      tip: "Clean backgrounds help the AI focus on faces"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Documentation & Guides
          </h1>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about creating amazing face swaps
          </p>
        </div>

        {/* User Guides */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">User Guides</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {guides.map((guide, index) => (
              <Card key={index} className="hover-scale">
                <CardHeader>
                  <guide.icon className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {guide.content.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" size="sm">
                    Read Full Guide
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tips & Best Practices */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Tips & Best Practices</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {tips.map((tip, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{tip.tip}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technical Specifications */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Technical Specifications</h2>
          <Card>
            <CardHeader>
              <CardTitle>Supported Formats & Limits</CardTitle>
              <CardDescription>Technical requirements for optimal performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Supported Image Formats</h4>
                <p className="text-sm text-muted-foreground">JPEG, PNG, GIF, WebP</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">File Size Limits</h4>
                <p className="text-sm text-muted-foreground">Maximum 10MB per image</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Recommended Resolution</h4>
                <p className="text-sm text-muted-foreground">512x512 to 2048x2048 pixels</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Processing Time</h4>
                <p className="text-sm text-muted-foreground">Single face: 2-5 seconds, Multiple faces: 10-30 seconds</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Documentation;

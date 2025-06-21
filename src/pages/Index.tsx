
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowDown, Users, Image } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
            Transform Faces with AI Magic
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground animate-fade-in">
            Experience the future of face swapping with our advanced AI technology. 
            Create stunning transformations in seconds with professional-quality results.
          </p>
          <div className="mt-10 flex items-center justify-center gap-6 animate-fade-in">
            <Link to="/single-swap">
              <Button size="lg" className="text-lg px-8 py-6 hover-scale">
                Start Swapping
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 hover-scale">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Powerful Features
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need for professional face swapping
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover-scale">
              <CardHeader>
                <Image className="h-10 w-10 text-primary" />
                <CardTitle>Single Face Swap</CardTitle>
                <CardDescription>
                  Swap faces between two photos with incredible precision and quality
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover-scale">
              <CardHeader>
                <Users className="h-10 w-10 text-primary" />
                <CardTitle>Multiple Face Swap</CardTitle>
                <CardDescription>
                  Process multiple faces in group photos simultaneously
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover-scale">
              <CardHeader>
                <ArrowDown className="h-10 w-10 text-primary" />
                <CardTitle>Instant Results</CardTitle>
                <CardDescription>
                  Get professional-quality results in seconds, not minutes
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of users creating amazing face swaps every day
          </p>
          <div className="mt-8">
            <Link to="/single-swap">
              <Button size="lg" className="text-lg px-8 py-6">
                Try It Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

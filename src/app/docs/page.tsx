import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BookOpen, Play, Upload, Sparkles, Download, Heart, Settings, HelpCircle } from "lucide-react"

export default function GettingStartedPage() {
  const steps = [
    {
      icon: Settings,
      title: "Create Your Account",
      description: "Sign up with Google OAuth for quick and secure access",
      details: [
        "Click 'Sign In' in the top navigation",
        "Choose 'Continue with Google'",
        "Grant necessary permissions",
        "You'll receive 50 free credits to get started!"
      ],
      badge: "Free Credits"
    },
    {
      icon: Upload,
      title: "Upload Your First Photo",
      description: "Choose a clear, well-lit photo for the best results",
      details: [
        "Navigate to the 'Generate' page",
        "Drag and drop your photo or click to browse",
        "Supported formats: JPG, PNG, WEBP (max 10MB)",
        "Check the preview and file details"
      ],
      badge: "Easy Upload"
    },
    {
      icon: Sparkles,
      title: "Choose Your Style",
      description: "Select from Classic, Kawaii, or Realistic plushie styles",
      details: [
        "Review the three available styles",
        "Each style has different characteristics",
        "See example previews for each option",
        "Select the style that matches your vision"
      ],
      badge: "3 Styles"
    },
    {
      icon: Play,
      title: "Generate Your Plushie",
      description: "Our AI transforms your photo into an adorable plushie",
      details: [
        "Review the credit cost (typically 1 credit)",
        "Click 'Generate My Plushie'",
        "Watch the progress as AI works its magic",
        "Generation typically takes 2-3 seconds"
      ],
      badge: "AI Powered"
    },
    {
      icon: Download,
      title: "Download & Share",
      description: "Save your creation and share it with others",
      details: [
        "Download high-resolution version",
        "Automatically saved to your gallery",
        "Share on social media (coming soon)",
        "Add to favorites for easy access"
      ],
      badge: "HD Quality"
    }
  ]

  const features = [
    {
      icon: Heart,
      title: "Gallery Management",
      description: "Organize and manage all your generated plushies in one place",
      link: "/gallery"
    },
    {
      icon: Sparkles,
      title: "Style Options",
      description: "Choose from Classic, Kawaii, or Realistic styles for different looks",
      link: "/generate"
    },
    {
      icon: Settings,
      title: "Account Settings",
      description: "Manage your profile, view credit balance, and track usage",
      link: "/dashboard"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="h-10 w-10 text-primary mr-4" />
            <h1 className="text-4xl font-bold">Getting Started with Plushify</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-6">
            Transform your photos into adorable plushies in just a few simple steps
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/generate">
                <Sparkles className="h-5 w-5 mr-2" />
                Start Creating
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/docs/faq">
                <HelpCircle className="h-5 w-5 mr-2" />
                View FAQ
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">50</div>
              <p className="text-sm text-muted-foreground">Free starter credits</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">2-3s</div>
              <p className="text-sm text-muted-foreground">Generation time</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">3</div>
              <p className="text-sm text-muted-foreground">Unique styles</p>
            </CardContent>
          </Card>
        </div>

        {/* Step-by-Step Guide */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="space-y-8">
            {steps.map((step, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <step.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-medium text-muted-foreground">
                              Step {index + 1}
                            </span>
                            <Badge variant="secondary">{step.badge}</Badge>
                          </div>
                          <h3 className="text-2xl font-bold">{step.title}</h3>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6">
                        {step.description}
                      </p>
                    </div>
                    <div>
                      <ul className="space-y-3">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {feature.description}
                  </CardDescription>
                  <Button variant="outline" asChild>
                    <Link href={feature.link}>
                      Learn More
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tips for Best Results */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Tips for Best Results</CardTitle>
            <CardDescription>
              Follow these guidelines to get the most amazing plushies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-green-600 mb-3">✓ Do This</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Use well-lit, clear photos</li>
                  <li>• Choose photos with good contrast</li>
                  <li>• Ensure the subject is centered and visible</li>
                  <li>• Use high-resolution images when possible</li>
                  <li>• Try different styles for variety</li>
                  <li>• Experiment with different angles</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-600 mb-3">✗ Avoid This</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Very dark or poorly lit photos</li>
                  <li>• Blurry or out-of-focus images</li>
                  <li>• Photos with cluttered backgrounds</li>
                  <li>• Extremely low resolution images</li>
                  <li>• Multiple subjects in one photo</li>
                  <li>• Inappropriate or offensive content</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Preview */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Common Questions</CardTitle>
            <CardDescription>
              Quick answers to frequently asked questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">How many credits do I start with?</h4>
                <p className="text-sm text-muted-foreground">
                  Every new user receives 50 free credits to get started. Each generation typically costs 1 credit.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Can I use photos of pets?</h4>
                <p className="text-sm text-muted-foreground">
                  Absolutely! Our AI works great with pet photos. We recommend using clear, well-lit photos for best results.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">What happens to my generated plushies?</h4>
                <p className="text-sm text-muted-foreground">
                  All your creations are automatically saved to your gallery. You can download, favorite, and manage them anytime.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Button variant="outline" asChild>
                <Link href="/docs/faq">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  View All FAQs
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Ready to Get Started?</CardTitle>
            <CardDescription className="text-center">
              Create your first plushie in less than a minute!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/generate">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Create My First Plushie
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/docs/upload-guidelines">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Guidelines
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Need help? <Link href="/docs/faq" className="text-primary hover:underline">Check our FAQ</Link> or
              <Link href="mailto:support@plushify.com" className="text-primary hover:underline ml-1">contact support</Link>
            </p>
          </CardContent>
        </Card>

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/docs/upload-guidelines"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Upload Guidelines
            </Link>
            <Link
              href="/docs/faq"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/legal/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}